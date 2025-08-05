-- Create function to generate UUID v7
CREATE OR REPLACE FUNCTION gen_uuid_v7()
RETURNS uuid
AS $$
BEGIN
  -- use random v4 uuid as starting point (which has the same variant we need)
  -- then overlay timestamp
  -- then set version 7 by flipping the 2 and 1 bit in the version 4 string
  RETURN encode(
    set_bit(
      set_bit(
        overlay(uuid_send(gen_random_uuid())
                placing substring(int8send(floor(extract(epoch FROM clock_timestamp()) * 1000)::BIGINT) FROM 3)
                FROM 1 FOR 6
        ),
        52, 1
      ),
      53, 1
    ),
    'hex')::uuid;
END
$$
LANGUAGE plpgsql
volatile
SECURITY INVOKER
SET search_path = '';

-- Create table locales
CREATE TABLE locales (
    id   VARCHAR(5) NOT NULL,
    name VARCHAR(255) NOT NULL,
    tsconfig_name NAME NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT (NOW()),
    CONSTRAINT locales_pkey PRIMARY KEY (id)
);

-- Create function get_tsconfig
CREATE OR REPLACE FUNCTION public.get_tsconfig(locale_id character varying)
    RETURNS regconfig
    LANGUAGE plpgsql
    IMMUTABLE
AS $$
DECLARE
    value regconfig;
BEGIN
    SELECT tsconfig_name::regconfig INTO value
    FROM public.locales
    WHERE id = locale_id;

    RETURN value;
END;
$$
SECURITY INVOKER
SET search_path = ''
;

-- Create table taxonomies
CREATE TABLE taxonomies
(
    id UUID NOT NULL DEFAULT gen_uuid_v7(),
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NULL,
    multiple_terms BOOLEAN NOT NULL DEFAULT false,
    locale_id VARCHAR(5) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT (NOW()),
    updated_at TIMESTAMP NOT NULL DEFAULT (NOW()),
    deleted_at TIMESTAMP NULL,
    CONSTRAINT taxonomies_pkey PRIMARY KEY (id),
    CONSTRAINT taxonomies_name_key UNIQUE (NAME),
    CONSTRAINT taxonomies_locale_id_fkey FOREIGN KEY (locale_id) REFERENCES locales (id) ON DELETE SET NULL
);

-- Create table terms
CREATE TABLE terms
(
    id UUID NOT NULL DEFAULT gen_uuid_v7(),
    taxonomy_id UUID NOT NULL,
    name        VARCHAR(255) NOT NULL,
    description VARCHAR(255) NULL,
    ts tsvector GENERATED ALWAYS AS (to_tsvector(get_tsconfig(locale_id), name::text || COALESCE(description, ''::character varying)::text)) STORED NULL,
    parent_term_id UUID NULL,
    locale_id VARCHAR(5) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT (NOW()),
    updated_at TIMESTAMP NOT NULL DEFAULT (NOW()),
    deleted_at TIMESTAMP NULL,
    CONSTRAINT terms_pkey PRIMARY KEY (id),
    CONSTRAINT terms_taxonomy_id_fkey FOREIGN KEY (taxonomy_id) REFERENCES taxonomies (id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT terms_parent_term_id_fkey FOREIGN KEY (parent_term_id) REFERENCES terms (id) ON UPDATE CASCADE  ON DELETE CASCADE,
    CONSTRAINT terms_locale_id_fkey FOREIGN KEY (locale_id) REFERENCES locales (id) ON DELETE SET NULL
);
CREATE INDEX terms_ts_idx ON terms USING GIN (ts);


-- Create table prompts
CREATE TABLE prompts
(
    id UUID NOT NULL DEFAULT gen_uuid_v7(),
    name              VARCHAR(255) NOT NULL,
    prompt            TEXT NULL,
    is_public         BOOLEAN NOT NULL DEFAULT true,
    is_latest_version BOOLEAN NOT NULL DEFAULT true,
    parent_prompt_id UUID NULL,
    version             INTEGER NOT NULL DEFAULT 1,
    locale_id           VARCHAR(5) NOT NULL,
    count_reaction_up   INTEGER NOT NULL DEFAULT 0,
    count_reaction_down INTEGER NOT NULL DEFAULT 0,
    count_favorite      INTEGER NOT NULL DEFAULT 0,
    indexed_at TIMESTAMP NULL,
    created_by UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT (NOW()),
    updated_at TIMESTAMP NOT NULL DEFAULT (NOW()),
    updated_by UUID NOT NULL,
    deleted_at TIMESTAMP NULL,
    deleted_by UUID NULL,
    CONSTRAINT prompts_pkey PRIMARY KEY (id),
    CONSTRAINT prompts_parent_prompt_id_fkey FOREIGN KEY (parent_prompt_id) REFERENCES prompts (id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT prompts_locale_id_fkey FOREIGN KEY (locale_id) REFERENCES locales (id) ON DELETE SET NULL
);

-- Create table prompt_terms
CREATE TABLE prompt_terms
(
    prompt_id UUID NOT NULL,
    term_id UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT (NOW()),
    CONSTRAINT prompt_terms_pkey PRIMARY KEY (prompt_id, term_id),
    CONSTRAINT prompt_terms_prompt_id_fkey FOREIGN KEY (prompt_id) REFERENCES prompts (id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT prompt_terms_term_id_fkey FOREIGN KEY (term_id) REFERENCES terms (id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Create table user_prompt_reactions
CREATE TYPE user_prompt_reaction_type AS ENUM ('up', 'down');
CREATE TABLE user_prompt_reactions
(
    user_id UUID NOT NULL,
    prompt_id UUID NOT NULL,
    reaction_type user_prompt_reaction_type NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT (NOW()),
    CONSTRAINT user_prompt_reactions_pkey PRIMARY KEY (user_id, prompt_id),
    CONSTRAINT user_prompt_reactions_prompt_id_fkey FOREIGN KEY (prompt_id) REFERENCES prompts (id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Create table user_prompt_favorites
CREATE TABLE user_prompt_favorites
(
    user_id UUID NOT NULL,
    prompt_id UUID NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT (NOW()),
    CONSTRAINT user_prompt_favorites_pkey PRIMARY KEY (user_id, prompt_id),
    CONSTRAINT user_prompt_favorites_prompt_id_fkey FOREIGN KEY (prompt_id) REFERENCES prompts (id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Enable Row Level Security on all tables
ALTER TABLE locales ENABLE ROW LEVEL SECURITY;
ALTER TABLE taxonomies ENABLE ROW LEVEL SECURITY;
ALTER TABLE terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt_terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_prompt_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_prompt_favorites ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
--
-- Name: user_prompt_favorites Enable delete for users based on user_id; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable delete for users based on user_id" ON public.user_prompt_favorites FOR DELETE USING ((( SELECT auth.uid() AS uid) = user_id));


--
-- Name: user_prompt_reactions Enable delete for users based on user_id; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable delete for users based on user_id" ON public.user_prompt_reactions FOR DELETE USING ((( SELECT auth.uid() AS uid) = user_id));


--
-- Name: user_prompt_favorites Enable insert for authenticated users only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable insert for authenticated users only" ON public.user_prompt_favorites FOR INSERT TO authenticated WITH CHECK (true);


--
-- Name: user_prompt_reactions Enable insert for authenticated users only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable insert for authenticated users only" ON public.user_prompt_reactions FOR INSERT TO authenticated WITH CHECK (true);


--
-- Name: locales Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.locales FOR SELECT TO authenticated USING (true);


--
-- Name: prompt_terms Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.prompt_terms FOR SELECT TO authenticated USING (true);


--
-- Name: taxonomies Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.taxonomies FOR SELECT TO authenticated USING (true);


--
-- Name: terms Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.terms FOR SELECT TO authenticated USING (true);


--
-- Name: user_prompt_reactions Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.user_prompt_reactions FOR SELECT TO authenticated USING (true);


--
-- Name: user_prompt_favorites Enable users to view their own data only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable users to view their own data only" ON public.user_prompt_favorites FOR SELECT TO authenticated USING ((( SELECT auth.uid() AS uid) = user_id));


--
-- Name: prompt_terms Authenticated users can delete for their own prompts; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Authenticated users can delete for their own prompts" ON public.prompt_terms FOR DELETE TO public USING ((( SELECT auth.uid() AS uid) IN ( SELECT prompts.created_by
    FROM prompts
  WHERE (prompts.id = prompt_terms.prompt_id))));


--
-- Name: prompt_terms Authenticated users can insert for their own prompts; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Authenticated users can insert for their own prompts" ON public.prompt_terms FOR INSERT TO authenticated WITH CHECK ((( SELECT auth.uid() AS uid) IN ( SELECT prompts.created_by
    FROM prompts
  WHERE (prompts.id = prompt_terms.prompt_id))));

-- =====================================================
-- TRIGGER FUNCTIONS FOR COUNT UPDATES
-- =====================================================

-- Function to update favorite count when user_prompt_favorites changes
CREATE OR REPLACE FUNCTION update_prompt_favorite_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Increment favorite count
        UPDATE public.prompts 
        SET count_favorite = count_favorite + 1,
            updated_at = NOW()
        WHERE id = NEW.prompt_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        -- Decrement favorite count
        UPDATE public.prompts 
        SET count_favorite = count_favorite - 1,
            updated_at = NOW()
        WHERE id = OLD.prompt_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql
volatile
SECURITY INVOKER
SET search_path = '';

-- Function to update reaction counts when user_prompt_reactions changes
CREATE OR REPLACE FUNCTION update_prompt_reaction_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Increment reaction count based on type
        IF NEW.reaction_type = 'up' THEN
            UPDATE public.prompts 
            SET count_reaction_up = count_reaction_up + 1,
                updated_at = NOW()
            WHERE id = NEW.prompt_id;
        ELSIF NEW.reaction_type = 'down' THEN
            UPDATE public.prompts 
            SET count_reaction_down = count_reaction_down + 1,
                updated_at = NOW()
            WHERE id = NEW.prompt_id;
        END IF;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        -- Decrement reaction count based on type
        IF OLD.reaction_type = 'up' THEN
            UPDATE public.prompts 
            SET count_reaction_up = count_reaction_up - 1,
                updated_at = NOW()
            WHERE id = OLD.prompt_id;
        ELSIF OLD.reaction_type = 'down' THEN
            UPDATE public.prompts 
            SET count_reaction_down = count_reaction_down - 1,
                updated_at = NOW()
            WHERE id = OLD.prompt_id;
        END IF;
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        -- Handle reaction type changes (e.g., up to down or vice versa)
        IF OLD.reaction_type != NEW.reaction_type THEN
            -- Decrement old reaction type
            IF OLD.reaction_type = 'up' THEN
                UPDATE public.prompts 
                SET count_reaction_up = count_reaction_up - 1
                WHERE id = OLD.prompt_id;
            ELSIF OLD.reaction_type = 'down' THEN
                UPDATE public.prompts 
                SET count_reaction_down = count_reaction_down - 1
                WHERE id = OLD.prompt_id;
            END IF;
            
            -- Increment new reaction type
            IF NEW.reaction_type = 'up' THEN
                UPDATE public.prompts 
                SET count_reaction_up = count_reaction_up + 1,
                    updated_at = NOW()
                WHERE id = NEW.prompt_id;
            ELSIF NEW.reaction_type = 'down' THEN
                UPDATE public.prompts 
                SET count_reaction_down = count_reaction_down + 1,
                    updated_at = NOW()
                WHERE id = NEW.prompt_id;
            END IF;
        END IF;
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql
volatile
SECURITY INVOKER
SET search_path = '';

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Trigger for user_prompt_favorites table
CREATE TRIGGER trigger_update_favorite_count
    AFTER INSERT OR DELETE ON user_prompt_favorites
    FOR EACH ROW
    EXECUTE FUNCTION update_prompt_favorite_count();

-- Trigger for user_prompt_reactions table
CREATE TRIGGER trigger_update_reaction_count
    AFTER INSERT OR UPDATE OR DELETE ON user_prompt_reactions
    FOR EACH ROW
    EXECUTE FUNCTION update_prompt_reaction_count();

