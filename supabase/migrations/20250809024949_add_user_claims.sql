CREATE TABLE user_claims (
    user_id UUID PRIMARY KEY,
    claims JSONB
);

ALTER TABLE user_claims ENABLE ROW LEVEL SECURITY;

-- Create the auth hook function
CREATE OR REPLACE FUNCTION public.assign_claims_to_token(event JSONB)
RETURNS JSONB
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
    claims JSONB;
BEGIN
    -- Fetch the claims from the user_claims table
    SELECT claims INTO claims FROM public.user_claims WHERE user_id = (event->>'user_id')::uuid;

    IF claims IS NOT NULL THEN
        -- Update the 'claims' object in the original event
        event := jsonb_set(event, '{claims}', claims);
    END IF;

    -- Return the modified or original event
    RETURN event;
END;
$$;

GRANT USAGE ON SCHEMA public TO supabase_auth_admin;

GRANT EXECUTE
  ON FUNCTION public.assign_claims_to_token
  TO supabase_auth_admin;

REVOKE EXECUTE
  ON FUNCTION public.assign_claims_to_token
  FROM authenticated, anon, public;

GRANT ALL
  ON TABLE public.user_claims
  TO supabase_auth_admin;

REVOKE ALL
  ON TABLE public.user_claims
  FROM authenticated, anon, public;

CREATE POLICY "Allow auth admin to read user roles" ON public.user_claims
AS PERMISSIVE FOR SELECT
TO supabase_auth_admin
USING (true);