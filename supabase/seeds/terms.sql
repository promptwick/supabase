-- Seeder for terms table
INSERT INTO terms (taxonomy_id, name, description, locale_id)
VALUES 
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Healthcare', 'Applications of LLM in healthcare', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Finance', 'Applications of LLM in finance', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Education', 'Applications of LLM in education', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Customer Service', 'Applications of LLM in customer service', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Marketing', 'Applications of LLM in marketing', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Legal', 'Applications of LLM in legal industry', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Entertainment', 'Applications of LLM in entertainment', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Research', 'Applications of LLM in research', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Human Resources', 'Applications of LLM in human resources', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Manufacturing', 'Applications of LLM in manufacturing', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Supply Chain', 'Applications of LLM in supply chain management', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Real Estate', 'Applications of LLM in real estate', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Technology', 'Applications of LLM in technology', 'en_US');

-- Insert sub-categories for each Category
INSERT INTO terms (taxonomy_id, name, description, parent_term_id, locale_id)
VALUES 
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Telemedicine', 'Telemedicine applications in healthcare', (SELECT id FROM terms WHERE name = 'Healthcare'), 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Medical Imaging', 'Medical imaging applications in healthcare', (SELECT id FROM terms WHERE name = 'Healthcare'), 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Fraud Detection', 'Fraud detection applications in finance', (SELECT id FROM terms WHERE name = 'Finance'), 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Algorithmic Trading', 'Algorithmic trading applications in finance', (SELECT id FROM terms WHERE name = 'Finance'), 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'E-Learning', 'E-learning applications in education', (SELECT id FROM terms WHERE name = 'Education'), 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Tutoring Systems', 'Tutoring systems applications in education', (SELECT id FROM terms WHERE name = 'Education'), 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Chatbots', 'Chatbots applications in customer service', (SELECT id FROM terms WHERE name = 'Customer Service'), 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Sentiment Analysis', 'Sentiment analysis applications in customer service', (SELECT id FROM terms WHERE name = 'Customer Service'), 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Ad Targeting', 'Ad targeting applications in marketing', (SELECT id FROM terms WHERE name = 'Marketing'), 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Market Research', 'Market research applications in marketing', (SELECT id FROM terms WHERE name = 'Marketing'), 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Contract Analysis', 'Contract analysis applications in legal industry', (SELECT id FROM terms WHERE name = 'Legal'), 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Legal Research', 'Legal research applications in legal industry', (SELECT id FROM terms WHERE name = 'Legal'), 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Content Creation', 'Content creation applications in entertainment', (SELECT id FROM terms WHERE name = 'Entertainment'), 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Game Development', 'Game development applications in entertainment', (SELECT id FROM terms WHERE name = 'Entertainment'), 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Data Analysis', 'Data analysis applications in research', (SELECT id FROM terms WHERE name = 'Research'), 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Scientific Research', 'Scientific research applications in research', (SELECT id FROM terms WHERE name = 'Research'), 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Recruitment', 'Recruitment applications in human resources', (SELECT id FROM terms WHERE name = 'Human Resources'), 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Employee Training', 'Employee training applications in human resources', (SELECT id FROM terms WHERE name = 'Human Resources'), 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Quality Control', 'Quality control applications in manufacturing', (SELECT id FROM terms WHERE name = 'Manufacturing'), 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Predictive Maintenance', 'Predictive maintenance applications in manufacturing', (SELECT id FROM terms WHERE name = 'Manufacturing'), 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Inventory Management', 'Inventory management applications in supply chain management', (SELECT id FROM terms WHERE name = 'Supply Chain'), 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Logistics Optimization', 'Logistics optimization applications in supply chain management', (SELECT id FROM terms WHERE name = 'Supply Chain'), 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Property Valuation', 'Property valuation applications in real estate', (SELECT id FROM terms WHERE name = 'Real Estate'), 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Smart Homes', 'Smart homes applications in real estate', (SELECT id FROM terms WHERE name = 'Real Estate'), 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Software Development', 'Software development applications in technology', (SELECT id FROM terms WHERE name = 'Technology'), 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Categories'), 'Cybersecurity', 'Cybersecurity applications in technology', (SELECT id FROM terms WHERE name = 'Technology'), 'en_US');


-- Insert terms for Support LLM taxonomy
INSERT INTO terms (taxonomy_id, name, description, locale_id)
VALUES 
    -- Text Generation Models
    ((SELECT id FROM taxonomies WHERE name = 'Supported Models'), 'GPT-4', 'OpenAI GPT-4 model family for text generation', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Supported Models'), 'GPT-3.5', 'OpenAI GPT-3.5 model family for text generation', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Supported Models'), 'Claude', 'Anthropic Claude model family for text generation', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Supported Models'), 'Gemini', 'Google Gemini model family for text generation', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Supported Models'), 'LLaMA', 'Meta LLaMA model family for text generation', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Supported Models'), 'Mistral', 'Mistral AI model family for text generation', 'en_US'),
    
    -- Image Generation Models
    ((SELECT id FROM taxonomies WHERE name = 'Supported Models'), 'DALL-E', 'OpenAI DALL-E model family for image generation', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Supported Models'), 'Midjourney', 'Midjourney model for image generation', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Supported Models'), 'Stable Diffusion', 'Stability AI Stable Diffusion model for image generation', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Supported Models'), 'Firefly', 'Adobe Firefly model for image generation', 'en_US'),
    
    -- Video Generation Models
    ((SELECT id FROM taxonomies WHERE name = 'Supported Models'), 'Sora', 'OpenAI Sora model for video generation', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Supported Models'), 'Runway', 'Runway ML models for video generation', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Supported Models'), 'Pika', 'Pika Labs model for video generation', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Supported Models'), 'Synthesia', 'Synthesia model for video generation', 'en_US');

-- Insert terms for Prompt Type taxonomy
INSERT INTO terms (taxonomy_id, name, description, locale_id)
VALUES 
    ((SELECT id FROM taxonomies WHERE name = 'Prompt Type'), 'Zero-shot prompting', 'Prompting without any examples', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Prompt Type'), 'Few-shot prompting', 'Prompting with a few examples', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Prompt Type'), 'Chain of thought (CoT) prompting', 'Prompting with a chain of thought process', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Prompt Type'), 'Prompt chaining', 'Chaining multiple prompts together', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Prompt Type'), 'Custom LLM prompts', 'Custom prompts for LLM', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Prompt Type'), 'Tree of thoughts prompting', 'Prompting with a tree of thoughts', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Prompt Type'), 'Constrained prompting', 'Prompting with constraints', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Prompt Type'), 'Directional stimulus', 'Prompting with directional stimulus', 'en_US');
    
-- Insert terms for Supported Applications taxonomy
INSERT INTO terms (taxonomy_id, name, description, locale_id)
VALUES
    ((SELECT id FROM taxonomies WHERE name = 'Supported Applications'), 'All Applications', 'All Applications', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Supported Applications'), 'Chatbots', 'Applications for chatbots', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Supported Applications'), 'IDE', 'Integrated Development Environment applications', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Supported Applications'), 'Word Processors', 'Applications for word processing', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Supported Applications'), 'Worksheets', 'Applications for worksheets', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Supported Applications'), 'Presentation Editor', 'Applications for presentation editing', 'en_US'),
    ((SELECT id FROM taxonomies WHERE name = 'Supported Applications'), 'Photo Editor', 'Applications for photo editing', 'en_US');