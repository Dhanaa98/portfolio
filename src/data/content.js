export const NAV = [
	{ id: 'intro', label: 'Home' },
	{ id: 'experience', label: 'Experience' },
	{ id: 'projects', label: 'Projects' },
	{ id: 'skills', label: 'Skills' },
	{ id: 'education', label: 'Education' },
	{ id: 'contact', label: 'Contact' },
];

/* certifications is still rendered as its own section, just not in the primary nav */
export const CERTIFICATIONS_SECTION_ID = 'certifications';

export const ROLES = ['Data Scientist', 'Machine Learning Engineer', 'BI Developer', 'Automation Specialist'];

export const SOCIALS = [
	{ label: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/dhananjaya-mudunkotuwa-/' },
	{ label: 'GitHub', icon: 'github', url: 'https://github.com/Dhanaa98' },
	{ label: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/_dha.naa_/' },
	{ label: 'Facebook', icon: 'facebook', url: 'https://web.facebook.com/dhananjaya.mudunkotuwa.9/' },
];

export const INFO = [
	{ k: 'Email', v: 'dhananjayamudunkotuwa1998@gmail.com', href: 'mailto:dhananjayamudunkotuwa1998@gmail.com' },
	{ k: 'Phone', v: '+94 76 250 7983', href: 'tel:+94762507983' },
	{ k: 'Location', v: 'Colombo, Sri Lanka' },
	{ k: 'LinkedIn', v: 'dhananjaya-mudunkotuwa', href: 'https://www.linkedin.com/in/dhananjaya-mudunkotuwa-/' },
];

export const EXPERIENCE = [
	{
		role: 'Marketing Data Scientist',
		co: 'Hype Invention',
		when: '2024 Sep - Present',
		current: true,
		bullets: [
			"Led end-to-end build of a marketing analytics scorecard replacing a manual monthly report: a daily pipeline pulling GA4, Google Ads, Meta and Klaviyo via OAuth2 APIs, plus an OpenAI-generated commentary layer for stakeholder write-ups.",
			'Looker Studio dashboards and KPI reporting pull together GA4, Google Ads, Meta Ads, GSC, CRM systems and other third-party platforms into a single view for stakeholders.',
			'Run predictive and traffic analysis to inform business growth decisions and campaign optimization.',
			'n8n, Zapier and Make workflows handle the repetitive parts of reporting, cutting down manual effort across the team.',
			'API integrations across multiple platforms keep data synchronized and support scalable automation.',
			'Automated data pipelines feed reporting systems with timely, accurate data for clients and stakeholders.',
		],
	},
];

export const TOOLS = [
	'Python', 'SQL', 'R', 'MySQL', 'Power BI', 'Looker Studio', 'Tableau', 'Excel',
	'Scikit-Learn', 'TensorFlow', 'Keras', 'PyTorch', 'Hugging Face',
	'n8n', 'Zapier', 'Make', 'GCP', 'GA4', 'Google Ads', 'Meta Ads', 'HubSpot', 'Mailchimp',
];

export const SKILLS = [
	{ key: 'lang', title: 'Programming', items: ['Python', 'SQL', 'R', 'MySQL'] },
	{ key: 'bi', title: 'Data Visualization & BI', items: ['Looker Studio', 'Power BI', 'Tableau', 'Excel', 'DAX'] },
	{ key: 'ml', title: 'Machine Learning & AI', items: ['Scikit-Learn', 'TensorFlow', 'Keras', 'PyTorch', 'NLP', 'Transformers', 'OpenCV', 'Predictive Analytics'] },
	{ key: 'auto', title: 'Automation & APIs', items: ['n8n', 'Zapier', 'Make', 'REST APIs', 'API Integrations', 'Workflow Automation'] },
	{ key: 'cloud', title: 'Cloud & Platforms', items: ['GCP', 'GA4', 'Search Console', 'Google Ads', 'Meta Ads', 'HubSpot', 'Mailchimp', 'CRM'] },
	{ key: 'soft', title: 'Working Style', items: ['Analytical Thinking', 'Problem Solving', 'Communication', 'Stakeholder Management', 'Team Collaboration'] },
];

export const EDUCATION = [
	{
		year: '2024 - Present', title: 'Bachelor of Information Technology (Undergraduate)',
		where: 'University of Colombo School of Computing',
	},
	{
		year: '2020 - 2024', title: 'BSc (Hons) in Science',
		where: 'Faculty of Science, University of Colombo',
	},
	{
		year: '2014 - 2017', title: 'G.C.E. Advanced Level, Biological Science',
		where: 'Ananda College, Colombo 10',
		result: 'A · Physics, A · Chemistry, B · Biology',
	},
	{
		year: '2009 - 2014', title: 'G.C.E. Ordinary Level',
		where: 'Thurstan College, Colombo 07',
		result: '9 A passes',
	},
];

export const CERTS = [
	'Google Data Analytics Professional Certificate',
	'Google AI Essentials Certificate',
	'Business Analytics for Decision Making',
	'SLIIT AI/ML Engineer, Stage 1',
];

export const PROJECTS = [
	{ t: 'Sentiment Analysis (NLP)', cat: 'ML', stack: ['VADER', 'RoBERTa', 'Hugging Face'], img: 'sentiment-analysis.jpg',
	  d: 'Scored 10,000 Amazon food reviews with NLTK VADER and a pretrained RoBERTa model (cardiffnlp/twitter-roberta-base-sentiment) to see how much sentiment nuance a bag-of-words baseline actually misses.',
	  url: 'https://github.com/Dhanaa98/Sentiment-Analysis-NLP' },
	{ t: 'Multiple Disease Prediction WebApp', cat: 'ML', stack: ['Logistic Regression', 'Random Forest', 'Scikit-learn'], img: 'disease_test.png',
	  d: 'Streamlit web app predicting disease risk from patient features (age, BMI, blood pressure, glucose) across multiple conditions, comparing Logistic Regression against Random Forest for robustness.',
	  url: 'https://github.com/Dhanaa98/Multiple-Diseases-Prediction-Web-App' },
	{ t: 'Resume Parsing WebApp', cat: 'ML', stack: ['NLP', 'Scikit-learn', 'Streamlit'], img: 'resume.png',
	  d: 'Extracts text from PDF/DOCX resumes, matches skills against job descriptions with regex and CountVectorizer + cosine similarity, and surfaces the gap in a Streamlit interface.',
	  url: 'https://github.com/Dhanaa98/Resume-Parsing-WebApp' },
	{ t: 'Job Recruitment Prediction', cat: 'ML', stack: ['Random Forest', 'SVM', 'Scikit-learn'], img: 'recruitment2.jpg',
	  d: 'Benchmarks Logistic Regression, Random Forest, Decision Tree and SVM on hiring-outcome data. Random Forest gave the best balance of accuracy and generalizability, while the Decision Tree showed clear overfitting.',
	  url: 'https://github.com/Dhanaa98/Job-Recruitment-Prediction' },
	{ t: 'Customer Segmentation (K-Means)', cat: 'ML', stack: ['K-Means', 'RFM', 'Scikit-learn'], img: 'customer-segmentation.png',
	  d: 'Segments bank transaction customers into four behavioral clusters via K-Means on RFM (Recency, Frequency, Monetary) metrics, ranging from low-engagement to high-frequency, high-value groups.',
	  url: 'https://github.com/Dhanaa98/Customer-Segmentation-through-K-Means-Clustering' },
	{ t: 'Gold Price Forecasting', cat: 'ML', stack: ['Prophet', 'Time Series'], img: 'gold.jpg',
	  d: 'Facebook Prophet model forecasting gold stock price from historical closing data, with trend and seasonality decomposition alongside the forecast bounds.',
	  url: 'https://github.com/Dhanaa98/Gold-Price-Forecasting-with-Prophet' },
	{ t: 'Sentiment Analysis with BERT', cat: 'ML', stack: ['BERT', 'Web Scraping'], img: 'yelp-sentiment.jpg',
	  d: 'Scrapes live Yelp reviews with BeautifulSoup and scores them 1–5 stars using a pretrained multilingual BERT model (nlptown/bert-base-multilingual-uncased-sentiment).',
	  url: 'https://github.com/Dhanaa98/Sentiment-Analysis-with-BERT' },
	{ t: 'Weather Forecasting (NeuralProphet)', cat: 'ML', stack: ['NeuralProphet', 'Time Series'], img: 'weather.jpg',
	  d: 'Trained NeuralProphet on historical Colombo weather data to forecast 900 days out, with trend and seasonality broken down for agriculture and energy-planning use cases.',
	  url: 'https://github.com/Dhanaa98/Weather-Forecasting-with-NeuralProphet' },
	{ t: 'Flight Satisfaction Survey', cat: 'Analysis', stack: ['Python', 'Pandas', 'Seaborn'], img: 'flight2.jpg',
	  d: 'Exploratory analysis of airline passenger survey data in a Jupyter notebook, identifying which aspects of the flight experience most influence satisfaction.',
	  url: 'https://github.com/Dhanaa98/Flight-Satisfaction-Survey' },
	{ t: 'Supply Chain Analysis', cat: 'Analysis', stack: ['Pandas', 'Matplotlib', 'Seaborn'], img: 'supplychain2.jpg',
	  d: 'FMCG supply-chain dataset analyzed to target inventory optimization, operational efficiency and defect reduction.',
	  url: 'https://github.com/Dhanaa98/Supply-Chain-Analysis' },
	{ t: 'Supermarket Sales Analysis', cat: 'Analysis', stack: ['Pandas', 'Matplotlib', 'Seaborn'], img: 'supermarket2.jpg',
	  d: 'Sales, customer behavior and profit analysis for a supermarket complex, built entirely in the Python data stack.',
	  url: 'https://github.com/Dhanaa98/Sales-Data' },
	{ t: 'Human Resources Dashboard', cat: 'BI', stack: ['Power BI', 'Excel'], img: 'hr-dashboard.png',
	  d: 'Power BI dashboard built from Excel HR records, tracking attrition trends, workforce demographics, department performance, job satisfaction and income distribution in one view.',
	  url: 'https://github.com/Dhanaa98/HR-Dashboard' },
	{ t: 'Project Management Dashboard', cat: 'BI', stack: ['Power BI', 'Excel'], img: 'project-management.png',
	  d: 'Tracks projects across four categories (income generation, process improvement, cost reduction, capital improvement) with phase tracking and cost/benefit comparison built in.',
	  url: 'https://github.com/Dhanaa98/Project-Management-Dashboard' },
	{ t: 'Nike Sales Dashboard', cat: 'BI', stack: ['Power BI'], img: 'nike_dashboard.png',
	  d: 'Breaks down Nike sales by region and by shoe, with dedicated views for pricing strategy and marketing performance.',
	  url: 'https://github.com/Dhanaa98/Nike-Sales-Dashboard' },
	{ t: 'Zomato Sales Dashboard', cat: 'BI', stack: ['Power BI'], img: 'zomato_dashboard.png',
	  d: 'Three linked views (overall sales, user performance, city performance) giving stakeholders a platform-wide read on activity.',
	  url: 'https://github.com/Dhanaa98/Zomato-Sales-Dashboard' },
	{ t: 'Tesla Dashboard', cat: 'BI', stack: ['Power BI'], img: 'tesla_dashboard.png',
	  d: 'Compares vehicle performance, capacity and sales trends across the Tesla model lineup.',
	  url: 'https://github.com/Dhanaa98/Tesla-Dashboard' },
	{ t: 'Netflix Dashboard', cat: 'BI', stack: ['Power BI', 'Excel'], img: 'netflix-dashboard.png',
	  d: 'Analyzes Netflix catalog data by content type, genre and country to surface ratings and audience trends.',
	  url: 'https://github.com/Dhanaa98/Netflix-Dashboard' },
	{ t: 'Sales Performance Dashboard', cat: 'BI', stack: ['Power BI', 'MySQL'], img: 'sales-performance-dashboard.png',
	  d: 'Adidas U.S. sales data cleaned in MySQL, then visualized in Power BI across sales trend, top products/retailers, top regions and channel mix (online, in-store, outlet).',
	  url: 'https://github.com/Dhanaa98/Sales-Performance-Dashboard' },
	{ t: 'Accidents Analysis Dashboard', cat: 'BI', stack: ['Power BI', 'MySQL'], img: 'accident-dashboard.png',
	  d: 'Thai road-accident data cleaned in MySQL and visualized to surface common causes, high-risk locations and the effect of weather conditions.',
	  url: 'https://github.com/Dhanaa98/Accidents-Analysis-Dashboard' },
	{ t: 'Coffee Sales Dashboard', cat: 'BI', stack: ['Excel'], img: 'coffee-sales-dashboard.png',
	  d: 'Excel-only dashboard built directly from raw coffee sales order data, with no external BI tool in the pipeline.',
	  url: 'https://github.com/Dhanaa98/Coffee-Sales-Dashboard' },
	{ t: 'Marketing Analytics Scorecard', cat: 'Automation', stack: ['GA4 API', 'Google Ads API', 'Meta Graph API', 'Klaviyo API', 'OpenAI'], img: 'marketing-analytics-scorecard.png',
	  d: "Replaced a manual, spreadsheet-based monthly report with a live marketing scorecard. Built the data layer - a daily cron job pulling and normalizing five live sources (GA4, Google Ads, Meta, Klaviyo) via their OAuth2 APIs - plus an OpenAI commentary generator drafting board-ready write-ups each month.",
	  url: null },
];

export const FILTERS = ['All', 'ML', 'Analysis', 'BI', 'Automation'];
