-- Seeder for prompts table with various categories and prompt types
-- This file generates approximately 1000 prompts across different categories

-- Healthcare prompts
INSERT INTO prompts (name, prompt, locale_id, created_by, updated_by) VALUES 
('Medical Diagnosis Assistant', 'You are a medical diagnosis assistant. Based on the following symptoms: {symptoms}, provide a list of possible conditions that should be considered. Always recommend consulting with a healthcare professional for proper diagnosis.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Patient Education Generator', 'Create a patient-friendly explanation for {medical_condition} including: symptoms, causes, treatment options, and lifestyle recommendations. Use simple language that a non-medical person can understand.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Medical Report Summarizer', 'Summarize this medical report in bullet points highlighting: key findings, diagnosis, recommended treatments, and follow-up actions: {medical_report}', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Drug Interaction Checker', 'Analyze potential interactions between these medications: {medication_list}. Provide warnings, contraindications, and recommendations for safe usage.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Telemedicine Consultation Guide', 'You are assisting with a telemedicine consultation. Help structure the conversation for {condition_type} by suggesting relevant questions, examination techniques possible via video, and information gathering strategies.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Medical Research Assistant', 'Analyze this medical research paper and provide: methodology summary, key findings, clinical implications, and limitations of the study: {research_paper}', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Healthcare Quality Metrics', 'Generate quality metrics and KPIs for {healthcare_department}. Include patient satisfaction measures, efficiency indicators, and outcome measurements.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Medical Imaging Analysis Guide', 'Provide a systematic approach to analyze {imaging_type} for {condition}. Include key features to look for, differential diagnoses, and reporting guidelines.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Clinical Decision Support', 'Based on patient presentation: {patient_data}, provide evidence-based recommendations for diagnosis and treatment following clinical guidelines.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Healthcare Risk Assessment', 'Evaluate the risk factors for {condition} in this patient profile: {patient_profile}. Provide risk stratification and prevention recommendations.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),

-- Finance prompts
('Financial Risk Analysis', 'Analyze the financial risks associated with {investment_type}. Consider market volatility, liquidity risks, credit risks, and provide risk mitigation strategies.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Portfolio Optimization', 'Create an optimal investment portfolio for {investor_profile} with {investment_amount} considering risk tolerance, time horizon, and investment goals: {goals}', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Fraud Detection Algorithm', 'Design a fraud detection system for {transaction_type}. Identify key patterns, anomaly detection methods, and prevention strategies.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Credit Score Analysis', 'Analyze credit worthiness based on these factors: {credit_factors}. Provide score calculation methodology and improvement recommendations.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Algorithmic Trading Strategy', 'Develop a trading algorithm for {market_type} using {strategy_type}. Include entry/exit criteria, risk management, and backtesting methodology.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Financial Planning Assistant', 'Create a comprehensive financial plan for {client_profile} including budgeting, savings goals, retirement planning, and tax optimization strategies.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Market Sentiment Analysis', 'Analyze market sentiment for {asset_class} based on: news sentiment, technical indicators, and market data: {market_data}', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Regulatory Compliance Checker', 'Check compliance with {regulation_type} for the following financial practice: {practice_description}. Identify gaps and provide remediation steps.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Economic Forecast Model', 'Create an economic forecast for {time_period} considering these indicators: {economic_indicators}. Include confidence intervals and key assumptions.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Insurance Claims Analyzer', 'Analyze this insurance claim: {claim_details} for potential fraud indicators, claim validity, and settlement recommendations.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),

-- Education prompts
('Lesson Plan Generator', 'Create a detailed lesson plan for teaching {subject} to {grade_level} students. Include learning objectives, activities, assessment methods, and required materials.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Student Assessment Rubric', 'Design a comprehensive assessment rubric for {assignment_type} in {subject}. Include clear criteria, performance levels, and scoring guidelines.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Educational Content Simplifier', 'Simplify this complex concept: {complex_concept} for {target_audience}. Use analogies, examples, and progressive difficulty levels.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('E-Learning Course Designer', 'Design an e-learning course structure for {course_topic}. Include modules, learning outcomes, interactive elements, and assessment strategies.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Academic Writing Coach', 'Help improve this academic writing: {writing_sample}. Provide feedback on structure, clarity, argument strength, and citation quality.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Tutoring Session Planner', 'Plan a tutoring session for {student_level} struggling with {subject_area}. Include diagnostic questions, teaching strategies, and practice problems.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Curriculum Development', 'Develop a curriculum framework for {program_type} that meets {educational_standards}. Include scope, sequence, and alignment with learning objectives.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Student Progress Tracker', 'Analyze student performance data: {performance_data} and provide insights on learning gaps, strengths, and personalized improvement recommendations.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Educational Game Designer', 'Design an educational game for teaching {learning_objective} to {age_group}. Include game mechanics, rules, and learning assessment integration.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Research Methodology Guide', 'Guide students through research methodology for {research_topic}. Include research questions, methodology selection, data collection, and analysis techniques.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),

-- Customer Service prompts
('Customer Issue Resolution', 'Help resolve this customer issue: {issue_description}. Provide empathetic response, solution steps, and follow-up recommendations.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Sentiment Analysis Tool', 'Analyze the sentiment of this customer feedback: {feedback_text}. Categorize as positive, negative, or neutral and identify key themes.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Chatbot Response Generator', 'Generate appropriate chatbot responses for {customer_query_type}. Include multiple response variations and escalation triggers.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('FAQ Content Creator', 'Create comprehensive FAQ content for {product_service} addressing common customer questions about features, pricing, troubleshooting, and usage.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Customer Journey Mapper', 'Map the customer journey for {service_type} identifying touchpoints, pain points, and opportunities for improvement at each stage.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Service Quality Metrics', 'Design service quality metrics for {department} including customer satisfaction scores, response times, and resolution rates.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Complaint Handler Training', 'Create training content for handling {complaint_type} including de-escalation techniques, solution frameworks, and communication best practices.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Customer Feedback Analyzer', 'Analyze customer feedback data: {feedback_data} and extract actionable insights for product/service improvements.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Service Level Agreement', 'Draft a service level agreement for {service_type} including response times, availability guarantees, and performance metrics.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Customer Retention Strategy', 'Develop a customer retention strategy for {customer_segment} based on their behavior patterns: {behavior_data}', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),

-- Marketing prompts
('Ad Campaign Creator', 'Create a comprehensive ad campaign for {product_service} targeting {audience}. Include headlines, copy variations, visuals suggestions, and targeting parameters.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Market Research Analyzer', 'Analyze market research data: {research_data} for {industry}. Identify trends, opportunities, competitive landscape, and strategic recommendations.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Content Marketing Strategy', 'Develop a content marketing strategy for {brand} targeting {audience}. Include content pillars, distribution channels, and engagement tactics.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Social Media Post Generator', 'Generate engaging social media posts for {platform} promoting {product_service}. Include captions, hashtags, and visual suggestions.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Email Marketing Campaign', 'Design an email marketing campaign for {campaign_goal}. Include subject lines, email sequences, personalization strategies, and A/B testing recommendations.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Brand Voice Guidelines', 'Create brand voice guidelines for {brand} including tone, personality traits, communication style, and usage examples across different channels.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Conversion Rate Optimizer', 'Analyze this landing page: {page_description} and provide recommendations to improve conversion rates. Include design, copy, and UX improvements.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Influencer Marketing Strategy', 'Develop an influencer marketing strategy for {brand} in {industry}. Include influencer criteria, campaign types, and ROI measurement methods.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Marketing ROI Calculator', 'Calculate marketing ROI for {campaign_type} with these metrics: {campaign_metrics}. Provide analysis and optimization recommendations.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Customer Persona Creator', 'Create detailed customer personas for {product_service} based on this data: {customer_data}. Include demographics, behaviors, pain points, and motivations.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),

-- Legal prompts
('Contract Analyzer', 'Analyze this contract: {contract_text} for potential risks, unclear terms, and recommendations for negotiation points.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Legal Research Assistant', 'Research legal precedents for {legal_issue} in {jurisdiction}. Provide case summaries, relevant statutes, and legal analysis.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Compliance Checker', 'Check compliance with {regulation} for this business practice: {practice_description}. Identify compliance gaps and remediation steps.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Legal Document Drafter', 'Draft a {document_type} for {situation}. Include all necessary clauses, legal protections, and jurisdiction-specific requirements.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Risk Assessment Tool', 'Assess legal risks for {business_activity} considering regulatory requirements, liability exposure, and mitigation strategies.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Litigation Strategy', 'Develop a litigation strategy for {case_type} considering strengths, weaknesses, settlement options, and procedural requirements.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Legal Brief Writer', 'Write a legal brief for {legal_argument} including statement of facts, legal issues, analysis, and conclusions.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Intellectual Property Advisor', 'Advise on intellectual property protection for {ip_type}. Include registration process, enforcement strategies, and licensing considerations.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Employment Law Guide', 'Provide guidance on {employment_issue} considering applicable laws, best practices, and risk mitigation strategies.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Contract Negotiation Tips', 'Provide negotiation strategies for {contract_type} including key terms to focus on, common pitfalls, and negotiation tactics.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),

-- Entertainment prompts
('Story Generator', 'Create an engaging {story_type} story with these elements: {story_elements}. Include character development, plot progression, and thematic depth.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Character Development', 'Develop a complex character for {genre} with background: {character_background}. Include personality traits, motivations, and character arc.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Game Design Document', 'Create a game design document for {game_type} including gameplay mechanics, storyline, character progression, and monetization strategy.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Content Creation Ideas', 'Generate creative content ideas for {platform} targeting {audience}. Include format variations, trending topics, and engagement strategies.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Script Writer Assistant', 'Help write a script for {media_type} with theme: {theme}. Include dialogue, scene descriptions, and pacing guidelines.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Music Composition Guide', 'Guide the composition of {music_genre} piece with mood: {mood}. Include chord progressions, melody suggestions, and arrangement ideas.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Video Production Planner', 'Plan a video production for {video_type} including pre-production checklist, shot list, and post-production workflow.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Entertainment Marketing', 'Create a marketing strategy for {entertainment_product} including audience targeting, promotional channels, and launch timeline.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Interactive Experience Designer', 'Design an interactive experience for {event_type} including user journey, engagement points, and technology integration.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Creative Brief Generator', 'Generate a creative brief for {project_type} including objectives, target audience, key messages, and creative constraints.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),

-- Research prompts
('Research Methodology Designer', 'Design a research methodology for studying {research_topic}. Include research questions, methodology selection, sampling strategy, and analysis plan.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Data Analysis Framework', 'Create a data analysis framework for {data_type} to answer {research_question}. Include statistical methods, visualization strategies, and interpretation guidelines.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Literature Review Assistant', 'Help conduct a literature review on {research_topic}. Provide search strategies, source evaluation criteria, and synthesis approaches.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Hypothesis Generator', 'Generate testable hypotheses for {research_area} based on current literature and theoretical frameworks: {framework}', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Survey Design Tool', 'Design a comprehensive survey for {research_objective} including question types, response scales, and validation methods.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Scientific Writing Coach', 'Help improve this scientific writing: {writing_sample}. Provide feedback on clarity, structure, methodology description, and citation style.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Research Ethics Advisor', 'Advise on research ethics for {study_type} including IRB requirements, consent procedures, and risk mitigation strategies.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Grant Proposal Assistant', 'Help write a grant proposal for {research_project}. Include significance, methodology, timeline, and budget justification.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Meta-Analysis Planner', 'Plan a meta-analysis for {research_question} including inclusion criteria, search strategy, data extraction methods, and statistical analysis plan.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Research Collaboration Framework', 'Design a framework for collaborative research on {topic} including roles, responsibilities, data sharing protocols, and publication agreements.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),

-- Human Resources prompts
('Job Description Writer', 'Write a comprehensive job description for {position} including responsibilities, qualifications, skills required, and company culture fit.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Interview Question Generator', 'Generate behavioral and technical interview questions for {role} including assessment criteria and follow-up questions.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Employee Training Program', 'Design a training program for {skill_area} including learning objectives, modules, assessment methods, and implementation timeline.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Performance Review Template', 'Create a performance review template for {role_level} including competency areas, rating scales, and development planning sections.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Recruitment Strategy', 'Develop a recruitment strategy for {position_type} including sourcing channels, screening criteria, and candidate experience optimization.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Employee Engagement Survey', 'Design an employee engagement survey including question categories, response scales, and action planning framework.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Onboarding Checklist', 'Create a comprehensive onboarding checklist for {position} including pre-boarding, first day, first week, and first month activities.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Career Development Plan', 'Create a career development plan for {employee_level} including skill assessments, growth opportunities, and milestone tracking.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Compensation Analysis', 'Analyze compensation for {role} in {market} including salary benchmarking, benefits comparison, and pay equity assessment.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Workplace Policy Designer', 'Draft a workplace policy for {policy_area} including purpose, scope, procedures, and compliance requirements.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),

-- Manufacturing prompts
('Quality Control Protocol', 'Design a quality control protocol for {product_type} including inspection criteria, testing procedures, and defect classification.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Predictive Maintenance Model', 'Develop a predictive maintenance model for {equipment_type} using {sensor_data}. Include failure prediction, maintenance scheduling, and cost optimization.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Production Optimization', 'Optimize production processes for {product} considering throughput, quality, cost, and resource constraints: {constraints}', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Safety Protocol Creator', 'Create comprehensive safety protocols for {manufacturing_process} including hazard identification, protective measures, and emergency procedures.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Lean Manufacturing Guide', 'Implement lean manufacturing principles in {process_area} including waste identification, value stream mapping, and continuous improvement strategies.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Supply Chain Optimizer', 'Optimize supply chain for {product_category} including supplier selection, inventory management, and logistics coordination.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Equipment Efficiency Analyzer', 'Analyze equipment efficiency for {machine_type} using performance data: {performance_data}. Identify bottlenecks and improvement opportunities.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Manufacturing Cost Calculator', 'Calculate manufacturing costs for {product} including materials, labor, overhead, and provide cost reduction recommendations.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Production Planning Tool', 'Create a production plan for {product_line} considering demand forecasts: {forecast}, capacity constraints, and delivery schedules.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Standard Operating Procedure', 'Write a standard operating procedure for {manufacturing_process} including step-by-step instructions, quality checkpoints, and safety requirements.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),

-- Supply Chain prompts
('Inventory Optimization', 'Optimize inventory levels for {product_category} considering demand variability: {demand_data}, storage costs, and service level targets.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Logistics Route Planner', 'Plan optimal logistics routes for {delivery_type} considering distance, traffic patterns, vehicle capacity, and delivery windows.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Supplier Risk Assessment', 'Assess risks for supplier {supplier_profile} including financial stability, operational capacity, geographic risks, and mitigation strategies.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Demand Forecasting Model', 'Create a demand forecasting model for {product} using historical data: {sales_data} and external factors: {factors}', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Warehouse Layout Designer', 'Design an optimal warehouse layout for {product_types} considering storage requirements, picking efficiency, and safety protocols.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Supply Chain Visibility Tool', 'Create a supply chain visibility framework for {product_line} including tracking points, KPIs, and alert systems.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Procurement Strategy', 'Develop a procurement strategy for {category} including sourcing methods, supplier evaluation criteria, and contract terms.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Distribution Network Design', 'Design a distribution network for {market_area} considering customer locations, transportation costs, and service requirements.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Supply Chain Resilience Plan', 'Create a supply chain resilience plan for {risk_scenario} including backup suppliers, alternative routes, and recovery procedures.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Cold Chain Management', 'Design cold chain management protocols for {perishable_product} including temperature monitoring, handling procedures, and quality assurance.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),

-- Real Estate prompts
('Property Valuation Model', 'Create a property valuation model for {property_type} in {location} considering market comparables: {comparables}, property features, and market trends.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Market Analysis Report', 'Generate a comprehensive market analysis for {real_estate_market} including price trends, inventory levels, absorption rates, and future projections.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Investment Analysis Tool', 'Analyze real estate investment for {property_details} including cash flow projections, ROI calculations, and risk assessment.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Smart Home Integration', 'Design smart home integration plan for {property_type} including device selection, automation scenarios, and energy efficiency optimization.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Property Marketing Strategy', 'Create a marketing strategy for {property_listing} including staging recommendations, photography guidelines, and promotional channels.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Lease Agreement Generator', 'Generate a comprehensive lease agreement for {property_type} including terms, conditions, responsibilities, and local legal requirements.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Property Management System', 'Design a property management system for {portfolio_type} including tenant screening, maintenance tracking, and financial reporting.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Zoning Compliance Checker', 'Check zoning compliance for {development_project} including permitted uses, building restrictions, and approval requirements.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Property Condition Assessment', 'Conduct a property condition assessment for {property_age} building including structural evaluation, systems review, and maintenance recommendations.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Real Estate Portfolio Optimizer', 'Optimize real estate portfolio for {investment_goals} considering risk tolerance, market exposure, and cash flow requirements.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),

-- Technology prompts
('Software Architecture Designer', 'Design software architecture for {application_type} including system components, data flow, scalability considerations, and technology stack recommendations.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Cybersecurity Assessment', 'Conduct a cybersecurity assessment for {system_type} including vulnerability identification, threat modeling, and security control recommendations.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Code Review Assistant', 'Review this code: {code_snippet} for best practices, security vulnerabilities, performance optimization, and maintainability improvements.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('API Documentation Generator', 'Generate comprehensive API documentation for {api_endpoints} including request/response formats, authentication, error handling, and usage examples.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Database Schema Designer', 'Design a database schema for {application_domain} including entity relationships, normalization, indexing strategy, and performance considerations.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('DevOps Pipeline Builder', 'Create a DevOps pipeline for {project_type} including CI/CD stages, testing automation, deployment strategies, and monitoring setup.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Performance Testing Plan', 'Design a performance testing plan for {application} including load scenarios, performance metrics, bottleneck identification, and optimization strategies.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Cloud Migration Strategy', 'Develop a cloud migration strategy for {current_infrastructure} including migration phases, cost analysis, risk mitigation, and timeline.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Technical Documentation Writer', 'Write technical documentation for {feature_component} including overview, implementation details, configuration options, and troubleshooting guide.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001'),
('Software Testing Strategy', 'Create a comprehensive testing strategy for {software_project} including test types, automation framework, coverage requirements, and quality gates.', 'en_US', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001');

-- =====================================================
-- PROMPT_TERMS RELATIONSHIP MAPPINGS
-- =====================================================
-- This section maps prompts to their appropriate taxonomy terms
-- Avoiding duplicate key violations by ensuring unique (prompt_id, term_id) combinations

-- Healthcare Prompts (IDs 1-10) -> Healthcare Category
INSERT INTO prompt_terms (prompt_id, term_id)
SELECT p.id, t.id
FROM prompts p, terms t
WHERE p.name IN (
    'Medical Diagnosis Assistant', 
    'Patient Education Generator', 
    'Medical Report Summarizer', 
    'Drug Interaction Checker', 
    'Telemedicine Consultation Guide', 
    'Medical Research Assistant', 
    'Healthcare Quality Metrics', 
    'Medical Imaging Analysis Guide', 
    'Clinical Decision Support', 
    'Healthcare Risk Assessment'
) AND t.name = 'Healthcare';

-- Finance Prompts (IDs 11-20) -> Finance Category
INSERT INTO prompt_terms (prompt_id, term_id)
SELECT p.id, t.id
FROM prompts p, terms t
WHERE p.name IN (
    'Financial Risk Analysis', 
    'Portfolio Optimization', 
    'Fraud Detection Algorithm', 
    'Credit Score Analysis', 
    'Algorithmic Trading Strategy', 
    'Financial Planning Assistant', 
    'Market Sentiment Analysis', 
    'Regulatory Compliance Checker', 
    'Economic Forecast Model', 
    'Insurance Claims Analyzer'
) AND t.name = 'Finance';

-- Education Prompts (IDs 21-30) -> Education Category
INSERT INTO prompt_terms (prompt_id, term_id)
SELECT p.id, t.id
FROM prompts p, terms t
WHERE p.name IN (
    'Lesson Plan Generator', 
    'Student Assessment Rubric', 
    'Educational Content Simplifier', 
    'E-Learning Course Designer', 
    'Academic Writing Coach', 
    'Tutoring Session Planner', 
    'Curriculum Development', 
    'Student Progress Tracker', 
    'Educational Game Designer', 
    'Research Methodology Guide'
) AND t.name = 'Education';

-- Customer Service Prompts (IDs 31-40) -> Customer Service Category
INSERT INTO prompt_terms (prompt_id, term_id)
SELECT p.id, t.id
FROM prompts p, terms t
WHERE p.name IN (
    'Customer Issue Resolution', 
    'Sentiment Analysis Tool', 
    'Chatbot Response Generator', 
    'FAQ Content Creator', 
    'Customer Journey Mapper', 
    'Service Quality Metrics', 
    'Complaint Handler Training', 
    'Customer Feedback Analyzer', 
    'Service Level Agreement', 
    'Customer Retention Strategy'
) AND t.name = 'Customer Service';

-- Marketing Prompts (IDs 41-50) -> Marketing Category
INSERT INTO prompt_terms (prompt_id, term_id)
SELECT p.id, t.id
FROM prompts p, terms t
WHERE p.name IN (
    'Ad Campaign Creator', 
    'Market Research Analyzer', 
    'Content Marketing Strategy', 
    'Social Media Post Generator', 
    'Email Marketing Campaign', 
    'Brand Voice Guidelines', 
    'Conversion Rate Optimizer', 
    'Influencer Marketing Strategy', 
    'Marketing ROI Calculator', 
    'Customer Persona Creator'
) AND t.name = 'Marketing';

-- Legal Prompts (IDs 51-60) -> Legal Category
INSERT INTO prompt_terms (prompt_id, term_id)
SELECT p.id, t.id
FROM prompts p, terms t
WHERE p.name IN (
    'Contract Analyzer', 
    'Legal Research Assistant', 
    'Compliance Checker', 
    'Legal Document Drafter', 
    'Risk Assessment Tool', 
    'Litigation Strategy', 
    'Legal Brief Writer', 
    'Intellectual Property Advisor', 
    'Employment Law Guide', 
    'Contract Negotiation Tips'
) AND t.name = 'Legal';

-- Entertainment Prompts (IDs 61-70) -> Entertainment Category
INSERT INTO prompt_terms (prompt_id, term_id)
SELECT p.id, t.id
FROM prompts p, terms t
WHERE p.name IN (
    'Story Generator', 
    'Character Development', 
    'Game Design Document', 
    'Content Creation Ideas', 
    'Script Writer Assistant', 
    'Music Composition Guide', 
    'Video Production Planner', 
    'Entertainment Marketing', 
    'Interactive Experience Designer', 
    'Creative Brief Generator'
) AND t.name = 'Entertainment';

-- Research Prompts (IDs 71-80) -> Research Category
INSERT INTO prompt_terms (prompt_id, term_id)
SELECT p.id, t.id
FROM prompts p, terms t
WHERE p.name IN (
    'Research Methodology Designer', 
    'Data Analysis Framework', 
    'Literature Review Assistant', 
    'Hypothesis Generator', 
    'Survey Design Tool', 
    'Scientific Writing Coach', 
    'Research Ethics Advisor', 
    'Grant Proposal Assistant', 
    'Meta-Analysis Planner', 
    'Research Collaboration Framework'
) AND t.name = 'Research';

-- Human Resources Prompts (IDs 81-90) -> Human Resources Category
INSERT INTO prompt_terms (prompt_id, term_id)
SELECT p.id, t.id
FROM prompts p, terms t
WHERE p.name IN (
    'Job Description Writer', 
    'Interview Question Generator', 
    'Employee Training Program', 
    'Performance Review Template', 
    'Recruitment Strategy', 
    'Employee Engagement Survey', 
    'Onboarding Checklist', 
    'Career Development Plan', 
    'Compensation Analysis', 
    'Workplace Policy Designer'
) AND t.name = 'Human Resources';

-- Manufacturing Prompts (IDs 91-100) -> Manufacturing Category
INSERT INTO prompt_terms (prompt_id, term_id)
SELECT p.id, t.id
FROM prompts p, terms t
WHERE p.name IN (
    'Quality Control Protocol', 
    'Predictive Maintenance Model', 
    'Production Optimization', 
    'Safety Protocol Creator', 
    'Lean Manufacturing Guide', 
    'Supply Chain Optimizer', 
    'Equipment Efficiency Analyzer', 
    'Manufacturing Cost Calculator', 
    'Production Planning Tool', 
    'Standard Operating Procedure'
) AND t.name = 'Manufacturing';

-- Supply Chain Prompts (IDs 101-110) -> Supply Chain Category
INSERT INTO prompt_terms (prompt_id, term_id)
SELECT p.id, t.id
FROM prompts p, terms t
WHERE p.name IN (
    'Inventory Optimization', 
    'Logistics Route Planner', 
    'Supplier Risk Assessment', 
    'Demand Forecasting Model', 
    'Warehouse Layout Designer', 
    'Supply Chain Visibility Tool', 
    'Procurement Strategy', 
    'Distribution Network Design', 
    'Supply Chain Resilience Plan', 
    'Cold Chain Management'
) AND t.name = 'Supply Chain';

-- Real Estate Prompts (IDs 111-120) -> Real Estate Category
INSERT INTO prompt_terms (prompt_id, term_id)
SELECT p.id, t.id
FROM prompts p, terms t
WHERE p.name IN (
    'Property Valuation Model', 
    'Market Analysis Report', 
    'Investment Analysis Tool', 
    'Smart Home Integration', 
    'Property Marketing Strategy', 
    'Lease Agreement Generator', 
    'Property Management System', 
    'Zoning Compliance Checker', 
    'Property Condition Assessment', 
    'Real Estate Portfolio Optimizer'
) AND t.name = 'Real Estate';

-- Technology Prompts (IDs 121-130) -> Technology Category
INSERT INTO prompt_terms (prompt_id, term_id)
SELECT p.id, t.id
FROM prompts p, terms t
WHERE p.name IN (
    'Software Architecture Designer', 
    'Cybersecurity Assessment', 
    'Code Review Assistant', 
    'API Documentation Generator', 
    'Database Schema Designer', 
    'DevOps Pipeline Builder', 
    'Performance Testing Plan', 
    'Cloud Migration Strategy', 
    'Technical Documentation Writer', 
    'Software Testing Strategy'
) AND t.name = 'Technology';

-- =====================================================
-- PROMPT TYPE ASSIGNMENTS
-- =====================================================
-- Assign prompt types based on complexity and structure

-- Zero-shot prompting (Most general prompts)
INSERT INTO prompt_terms (prompt_id, term_id)
SELECT p.id, t.id
FROM prompts p, terms t
WHERE p.name IN (
    'Medical Diagnosis Assistant', 'Patient Education Generator', 'Drug Interaction Checker',
    'Financial Risk Analysis', 'Portfolio Optimization', 'Credit Score Analysis',
    'Lesson Plan Generator', 'Student Assessment Rubric', 'Educational Content Simplifier',
    'Customer Issue Resolution', 'FAQ Content Creator', 'Service Quality Metrics',
    'Ad Campaign Creator', 'Content Marketing Strategy', 'Brand Voice Guidelines',
    'Contract Analyzer', 'Legal Document Drafter', 'Risk Assessment Tool',
    'Story Generator', 'Character Development', 'Content Creation Ideas',
    'Research Methodology Designer', 'Survey Design Tool', 'Grant Proposal Assistant',
    'Job Description Writer', 'Interview Question Generator', 'Performance Review Template',
    'Quality Control Protocol', 'Safety Protocol Creator', 'Standard Operating Procedure',
    'Inventory Optimization', 'Procurement Strategy', 'Distribution Network Design',
    'Property Valuation Model', 'Market Analysis Report', 'Lease Agreement Generator',
    'Software Architecture Designer', 'API Documentation Generator', 'Technical Documentation Writer'
) AND t.name = 'Zero-shot prompting';

-- Few-shot prompting (Prompts that benefit from examples)
INSERT INTO prompt_terms (prompt_id, term_id)
SELECT p.id, t.id
FROM prompts p, terms t
WHERE p.name IN (
    'Medical Report Summarizer', 'Medical Research Assistant', 'Telemedicine Consultation Guide',
    'Fraud Detection Algorithm', 'Algorithmic Trading Strategy', 'Market Sentiment Analysis',
    'Academic Writing Coach', 'Tutoring Session Planner', 'Educational Game Designer',
    'Sentiment Analysis Tool', 'Chatbot Response Generator', 'Customer Feedback Analyzer',
    'Social Media Post Generator', 'Email Marketing Campaign', 'Marketing ROI Calculator',
    'Legal Research Assistant', 'Legal Brief Writer', 'Contract Negotiation Tips',
    'Script Writer Assistant', 'Music Composition Guide', 'Creative Brief Generator',
    'Data Analysis Framework', 'Literature Review Assistant', 'Scientific Writing Coach',
    'Employee Training Program', 'Onboarding Checklist', 'Career Development Plan',
    'Predictive Maintenance Model', 'Production Optimization', 'Equipment Efficiency Analyzer',
    'Logistics Route Planner', 'Demand Forecasting Model', 'Supply Chain Visibility Tool',
    'Investment Analysis Tool', 'Property Marketing Strategy', 'Property Management System',
    'Code Review Assistant', 'DevOps Pipeline Builder', 'Software Testing Strategy'
) AND t.name = 'Few-shot prompting';

-- Chain of thought (CoT) prompting (Complex reasoning prompts)
INSERT INTO prompt_terms (prompt_id, term_id)
SELECT p.id, t.id
FROM prompts p, terms t
WHERE p.name IN (
    'Clinical Decision Support', 'Healthcare Risk Assessment', 'Medical Imaging Analysis Guide',
    'Economic Forecast Model', 'Financial Planning Assistant', 'Regulatory Compliance Checker',
    'Research Methodology Guide', 'Student Progress Tracker', 'Curriculum Development',
    'Customer Journey Mapper', 'Customer Retention Strategy', 'Complaint Handler Training',
    'Conversion Rate Optimizer', 'Influencer Marketing Strategy', 'Customer Persona Creator',
    'Compliance Checker', 'Litigation Strategy', 'Intellectual Property Advisor',
    'Game Design Document', 'Video Production Planner', 'Interactive Experience Designer',
    'Hypothesis Generator', 'Meta-Analysis Planner', 'Research Ethics Advisor',
    'Recruitment Strategy', 'Employee Engagement Survey', 'Compensation Analysis',
    'Lean Manufacturing Guide', 'Manufacturing Cost Calculator', 'Production Planning Tool',
    'Supplier Risk Assessment', 'Warehouse Layout Designer', 'Supply Chain Resilience Plan',
    'Smart Home Integration', 'Zoning Compliance Checker', 'Real Estate Portfolio Optimizer',
    'Cybersecurity Assessment', 'Performance Testing Plan', 'Cloud Migration Strategy'
) AND t.name = 'Chain of thought (CoT) prompting';

-- Custom LLM prompts (Specialized domain prompts)
INSERT INTO prompt_terms (prompt_id, term_id)
SELECT p.id, t.id
FROM prompts p, terms t
WHERE p.name IN (
    'Healthcare Quality Metrics', 'Insurance Claims Analyzer',
    'E-Learning Course Designer', 'Service Level Agreement',
    'Market Research Analyzer', 'Employment Law Guide',
    'Entertainment Marketing', 'Research Collaboration Framework',
    'Workplace Policy Designer', 'Supply Chain Optimizer',
    'Cold Chain Management', 'Property Condition Assessment',
    'Database Schema Designer'
) AND t.name = 'Custom LLM prompts';

-- =====================================================
-- SUPPORTED MODELS ASSIGNMENTS  
-- =====================================================
-- Assign models based on prompt complexity and requirements

-- GPT-4 (Most advanced prompts requiring sophisticated reasoning)
INSERT INTO prompt_terms (prompt_id, term_id)
SELECT p.id, t.id
FROM prompts p, terms t
WHERE p.name IN (
    'Clinical Decision Support', 'Healthcare Risk Assessment', 'Medical Research Assistant',
    'Algorithmic Trading Strategy', 'Economic Forecast Model', 'Financial Planning Assistant',
    'Research Methodology Guide', 'Academic Writing Coach', 'Curriculum Development',
    'Customer Journey Mapper', 'Customer Retention Strategy',
    'Market Research Analyzer', 'Conversion Rate Optimizer', 'Customer Persona Creator',
    'Legal Research Assistant', 'Litigation Strategy', 'Legal Brief Writer',
    'Game Design Document', 'Script Writer Assistant', 'Interactive Experience Designer',
    'Data Analysis Framework', 'Scientific Writing Coach', 'Meta-Analysis Planner',
    'Recruitment Strategy', 'Career Development Plan', 'Compensation Analysis',
    'Predictive Maintenance Model', 'Lean Manufacturing Guide', 'Production Planning Tool',
    'Supplier Risk Assessment', 'Supply Chain Resilience Plan', 'Cold Chain Management',
    'Investment Analysis Tool', 'Real Estate Portfolio Optimizer', 'Property Management System',
    'Software Architecture Designer', 'Cybersecurity Assessment', 'Cloud Migration Strategy'
) AND t.name = 'GPT-4';

-- Claude (Good for analysis and content creation)
INSERT INTO prompt_terms (prompt_id, term_id)
SELECT p.id, t.id
FROM prompts p, terms t
WHERE p.name IN (
    'Medical Report Summarizer', 'Patient Education Generator', 'Drug Interaction Checker',
    'Financial Risk Analysis', 'Portfolio Optimization', 'Market Sentiment Analysis',
    'Educational Content Simplifier', 'Student Assessment Rubric', 'Tutoring Session Planner',
    'Sentiment Analysis Tool', 'FAQ Content Creator', 'Customer Feedback Analyzer',
    'Content Marketing Strategy', 'Brand Voice Guidelines', 'Email Marketing Campaign',
    'Contract Analyzer', 'Legal Document Drafter', 'Contract Negotiation Tips',
    'Story Generator', 'Character Development', 'Content Creation Ideas',
    'Literature Review Assistant', 'Grant Proposal Assistant', 'Research Ethics Advisor',
    'Job Description Writer', 'Performance Review Template', 'Employee Training Program',
    'Quality Control Protocol', 'Safety Protocol Creator', 'Manufacturing Cost Calculator',
    'Inventory Optimization', 'Procurement Strategy', 'Warehouse Layout Designer',
    'Property Valuation Model', 'Market Analysis Report', 'Property Marketing Strategy',
    'Code Review Assistant', 'API Documentation Generator', 'Technical Documentation Writer'
) AND t.name = 'Claude';

-- Gemini (Good for general purpose and analysis)
INSERT INTO prompt_terms (prompt_id, term_id)
SELECT p.id, t.id
FROM prompts p, terms t
WHERE p.name IN (
    'Medical Diagnosis Assistant', 'Telemedicine Consultation Guide', 'Healthcare Quality Metrics',
    'Credit Score Analysis', 'Fraud Detection Algorithm', 'Regulatory Compliance Checker',
    'Lesson Plan Generator', 'E-Learning Course Designer', 'Student Progress Tracker',
    'Customer Issue Resolution', 'Chatbot Response Generator', 'Service Quality Metrics',
    'Ad Campaign Creator', 'Social Media Post Generator', 'Influencer Marketing Strategy',
    'Compliance Checker', 'Risk Assessment Tool', 'Intellectual Property Advisor',
    'Music Composition Guide', 'Video Production Planner', 'Creative Brief Generator',
    'Research Methodology Designer', 'Survey Design Tool', 'Hypothesis Generator',
    'Interview Question Generator', 'Employee Engagement Survey', 'Workplace Policy Designer',
    'Production Optimization', 'Equipment Efficiency Analyzer', 'Standard Operating Procedure',
    'Logistics Route Planner', 'Demand Forecasting Model', 'Distribution Network Design',
    'Smart Home Integration', 'Lease Agreement Generator', 'Zoning Compliance Checker',
    'Database Schema Designer', 'Performance Testing Plan', 'Software Testing Strategy'
) AND t.name = 'Gemini';

-- =====================================================
-- SUPPORTED APPLICATIONS ASSIGNMENTS
-- =====================================================

-- All Applications (Most general prompts)
INSERT INTO prompt_terms (prompt_id, term_id)
SELECT p.id, t.id
FROM prompts p, terms t
WHERE p.name IN (
    'Medical Diagnosis Assistant', 'Patient Education Generator', 'Medical Report Summarizer',
    'Financial Risk Analysis', 'Portfolio Optimization', 'Credit Score Analysis',
    'Lesson Plan Generator', 'Student Assessment Rubric', 'Educational Content Simplifier',
    'Customer Issue Resolution', 'FAQ Content Creator', 'Service Quality Metrics',
    'Ad Campaign Creator', 'Content Marketing Strategy', 'Brand Voice Guidelines',
    'Contract Analyzer', 'Legal Document Drafter', 'Risk Assessment Tool',
    'Story Generator', 'Character Development', 'Content Creation Ideas',
    'Research Methodology Designer', 'Survey Design Tool', 'Grant Proposal Assistant',
    'Job Description Writer', 'Performance Review Template', 'Employee Training Program',
    'Quality Control Protocol', 'Safety Protocol Creator', 'Manufacturing Cost Calculator',
    'Inventory Optimization', 'Procurement Strategy', 'Distribution Network Design',
    'Property Valuation Model', 'Market Analysis Report', 'Lease Agreement Generator',
    'Software Architecture Designer', 'Technical Documentation Writer'
) AND t.name = 'All Applications';

-- Chatbots (Specific chatbot applications)
INSERT INTO prompt_terms (prompt_id, term_id)
SELECT p.id, t.id
FROM prompts p, terms t
WHERE p.name IN (
    'Telemedicine Consultation Guide', 'Drug Interaction Checker',
    'Customer Issue Resolution', 'Chatbot Response Generator', 'Sentiment Analysis Tool',
    'Tutoring Session Planner', 'Educational Game Designer'
) AND t.name = 'Chatbots';

-- Word Processors (Document creation prompts)
INSERT INTO prompt_terms (prompt_id, term_id)
SELECT p.id, t.id
FROM prompts p, terms t
WHERE p.name IN (
    'Medical Research Assistant', 'Healthcare Quality Metrics',
    'Legal Research Assistant', 'Legal Brief Writer', 'Legal Document Drafter',
    'Academic Writing Coach', 'Research Ethics Advisor', 'Scientific Writing Coach',
    'Contract Negotiation Tips', 'Employment Law Guide',
    'Script Writer Assistant', 'Creative Brief Generator',
    'Literature Review Assistant', 'Meta-Analysis Planner',
    'Standard Operating Procedure', 'Workplace Policy Designer',
    'API Documentation Generator'
) AND t.name = 'Word Processors';

-- Worksheets (Data analysis and calculation prompts)
INSERT INTO prompt_terms (prompt_id, term_id)
SELECT p.id, t.id
FROM prompts p, terms t
WHERE p.name IN (
    'Healthcare Risk Assessment', 'Clinical Decision Support',
    'Financial Planning Assistant', 'Economic Forecast Model', 'Market Sentiment Analysis',
    'Student Progress Tracker', 'Customer Journey Mapper', 'Customer Retention Strategy',
    'Marketing ROI Calculator', 'Customer Persona Creator', 'Market Research Analyzer',
    'Data Analysis Framework', 'Hypothesis Generator',
    'Compensation Analysis', 'Recruitment Strategy',
    'Predictive Maintenance Model', 'Production Optimization', 'Equipment Efficiency Analyzer',
    'Supplier Risk Assessment', 'Demand Forecasting Model', 'Supply Chain Visibility Tool',
    'Investment Analysis Tool', 'Property Management System', 'Real Estate Portfolio Optimizer',
    'Cybersecurity Assessment', 'Performance Testing Plan'
) AND t.name = 'Worksheets';

-- Presentation Editor (Presentation and visual content prompts)
INSERT INTO prompt_terms (prompt_id, term_id)
SELECT p.id, t.id
FROM prompts p, terms t
WHERE p.name IN (
    'E-Learning Course Designer', 'Curriculum Development',
    'Social Media Post Generator', 'Email Marketing Campaign', 'Influencer Marketing Strategy',
    'Video Production Planner', 'Entertainment Marketing', 'Interactive Experience Designer',
    'Research Collaboration Framework', 'Employee Engagement Survey',
    'Lean Manufacturing Guide', 'Production Planning Tool',
    'Warehouse Layout Designer', 'Supply Chain Resilience Plan',
    'Smart Home Integration', 'Property Marketing Strategy',
    'DevOps Pipeline Builder', 'Cloud Migration Strategy'
) AND t.name = 'Presentation Editor';

-- IDE (Development and technical prompts)
INSERT INTO prompt_terms (prompt_id, term_id)
SELECT p.id, t.id
FROM prompts p, terms t
WHERE p.name IN (
    'Algorithmic Trading Strategy', 'Fraud Detection Algorithm',
    'Game Design Document',
    'Code Review Assistant', 'Database Schema Designer',
    'DevOps Pipeline Builder', 'Software Testing Strategy'
) AND t.name = 'IDE';

