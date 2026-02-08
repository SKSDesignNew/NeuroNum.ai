# NeuroNum.ai

Adaptive AI tutoring platform for high school students (grades 9-12) focused on **Science** and **Financial Literacy**.

## Features

- **Adaptive Learning Pathways** — AI adjusts to each student's skill level
- **Dual AI Tutors** — Side-by-side study notes from two independent AI perspectives
- **SAT/ACT Prep** — Smart drills targeting weak spots
- **Parent & Teacher Dashboards** — Real-time progress tracking
- **Multi-step Profile** — Grade-appropriate topics for Science and Finance

## Architecture

Fully serverless on AWS — no servers to manage.

```
┌─────────────────────────────────────────────────────┐
│                   AWS Amplify Hosting                │
│   index.html  auth.html  profile.html  dashboard.html│
│   css/*  js/*  assets/*                              │
└────────────────────┬────────────────────────────────┘
                     │
     ┌───────────────┼───────────────┐
     ▼               ▼               ▼
┌─────────┐  ┌─────────────┐  ┌───────────┐
│ Cognito │  │ API Gateway │  │  Route 53  │
│ Auth    │  │ + Cognito   │  │  + ACM     │
│ (OAuth) │  │ Authorizer  │  │  (Domain)  │
└─────────┘  └──────┬──────┘  └───────────┘
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
   ┌─────────────┐    ┌─────────────┐
   │   Lambda    │    │   Lambda    │
   │  generate   │    │  profile    │
   │  (AI notes) │    │  (CRUD)     │
   └──────┬──────┘    └──────┬──────┘
          │                  │
   ┌──────┴──────┐    ┌──────┴──────┐
   │ Claude API  │    │  DynamoDB   │
   │ Gemini API  │    │  (profiles) │
   └─────────────┘    └─────────────┘
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, Vanilla JS (AWS Amplify Hosting) |
| Auth | Amazon Cognito (Google & Apple OAuth) |
| API | Amazon API Gateway (REST, Cognito authorizer) |
| Compute | AWS Lambda (Node.js 20.x) |
| Database | Amazon DynamoDB (profiles table) |
| AI — Tutor Alpha | Anthropic Claude API |
| AI — Tutor Beta | Google Gemini Pro API |
| IaC | AWS SAM (template.yaml) |
| Domain/SSL | Route 53 + ACM (optional) |

## Project Structure

```
NeuroNum.ai/
├── index.html              # Landing page (split Science / Finance layout)
├── auth.html               # Authentication (Google & Apple OAuth)
├── profile.html            # Multi-step profile form
├── dashboard.html          # Study notes dashboard (dual AI side-by-side)
├── css/
│   ├── style.css           # Global styles + landing page
│   ├── auth.css            # Auth page styles
│   ├── profile.css         # Profile form styles
│   └── dashboard.css       # Dashboard styles
├── js/
│   ├── main.js             # Landing page interactions
│   ├── aws-auth.js         # Cognito auth client (tokens, login, logout)
│   ├── env-config.js       # Runtime config (overwritten by Amplify build)
│   ├── auth.js             # OAuth authentication flow
│   ├── profile.js          # Multi-step form + topic selection
│   └── dashboard.js        # Dashboard + AI note generation
├── lambda/
│   ├── index.js            # AI generation Lambda handler
│   ├── profile.js          # Profile CRUD Lambda handler (DynamoDB)
│   ├── package.json        # Lambda dependencies
│   └── config/
│       └── ai-agent.json   # Configurable AI prompt templates
├── server/                 # Local development server (not deployed)
│   ├── server.js
│   └── routes/ai.js
├── template.yaml           # AWS SAM template (full infra)
├── amplify.yml             # Amplify build specification
├── scripts/deploy.sh       # Backend deployment script
├── .env.example            # Local dev environment variables
└── .gitignore
```

## Deployment Guide

### Prerequisites

1. **AWS Account** with admin access
2. **AWS CLI** installed and configured (`aws configure`)
3. **AWS SAM CLI** installed ([install guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html))
4. **Node.js 18+** installed
5. **API Keys**: Anthropic API key + Google Gemini API key
6. **OAuth Credentials** (optional): Google Cloud OAuth client ID/secret and/or Apple Sign In credentials

### Step 1: Deploy the Backend (SAM)

```bash
# Clone the repo
git clone https://github.com/your-org/NeuroNum.ai.git
cd NeuroNum.ai

# Run the deploy script
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

The guided deploy will prompt you for:
- **Stack Name**: `neuronum-ai` (default)
- **Region**: `us-east-1` (default)
- **AnthropicApiKey**: Your Anthropic API key
- **GeminiApiKey**: Your Google Gemini API key
- **CognitoDomainPrefix**: A unique prefix (e.g. `neuronum`)
- **GoogleClientId / GoogleClientSecret**: From Google Cloud Console (leave blank to skip)
- **AppleTeamId / AppleServicesId / AppleKeyId / ApplePrivateKey**: From Apple Developer (leave blank to skip)
- **FrontendCallbackUrl**: `https://yourdomain.com/auth.html`
- **FrontendLogoutUrl**: `https://yourdomain.com/`
- **AllowedOrigin**: `https://yourdomain.com`
- **CustomDomainName / CertificateArn**: For custom API domain (leave blank to skip)

After deployment, note these **Stack Outputs**:
- `ApiUrl` — API Gateway endpoint
- `CognitoDomain` — Cognito hosted UI domain
- `CognitoClientId` — App client ID
- `UserPoolId` — Cognito User Pool ID

### Step 2: Set Up Google OAuth (if using Google Sign-In)

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create an OAuth 2.0 Client ID (Web application)
3. Add authorized redirect URI: `https://<CognitoDomainPrefix>.auth.<region>.amazoncognito.com/oauth2/idpresponse`
4. Copy Client ID and Client Secret — you entered these in Step 1

### Step 3: Set Up Apple Sign In (if using Apple)

1. In Apple Developer Console, create a Services ID
2. Configure Sign in with Apple, adding the return URL: `https://<CognitoDomainPrefix>.auth.<region>.amazoncognito.com/oauth2/idpresponse`
3. Generate a private key for Sign in with Apple

### Step 4: Deploy Frontend (AWS Amplify)

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click **New app** > **Host web app**
3. Connect your GitHub repository and select the branch
4. Amplify will auto-detect `amplify.yml`
5. Add these **Environment Variables** in Amplify Console:

| Variable | Value |
|----------|-------|
| `COGNITO_DOMAIN` | `<CognitoDomain>` from stack outputs |
| `COGNITO_CLIENT_ID` | `<CognitoClientId>` from stack outputs |
| `COGNITO_REDIRECT_URI` | `https://yourdomain.com/auth.html` |
| `COGNITO_LOGOUT_URI` | `https://yourdomain.com/` |
| `COGNITO_REGION` | `us-east-1` (or your region) |
| `API_BASE_URL` | `<ApiUrl>` from stack outputs |

6. Click **Save** and trigger a deploy

### Step 5: Connect Your Custom Domain

1. In Amplify Console, go to **Domain management**
2. Click **Add domain** and select your Route 53 domain
3. Configure subdomains (e.g. `www` → branch, root → redirect to `www`)
4. Amplify will auto-provision an SSL certificate

### Step 6: Update Cognito Callback URLs

After your domain is live, update the Cognito App Client:

1. Go to **Cognito Console** > **User Pools** > `neuronum-users`
2. Go to **App integration** > **App client: neuronum-web**
3. Update:
   - **Callback URL** → `https://yourdomain.com/auth.html`
   - **Sign-out URL** → `https://yourdomain.com/`
4. Under **Hosted UI**, ensure Google and/or Apple are listed as identity providers

### Step 7: Verify

1. Visit `https://yourdomain.com`
2. Click **Create Your Account**
3. Sign in with Google or Apple
4. Complete the profile form
5. Generate study notes on the dashboard

## AI Agent Configuration

Prompt templates are configurable in `lambda/config/ai-agent.json`:

- **System prompts** — Controls the AI tutor's behavior and expertise
- **User prompts** — Template for study note generation requests
- **Tutor personas** — Alpha (analytical/structured) vs Beta (creative/intuitive)
- **Model settings** — Model names, temperature, max tokens
- **Subject context** — Additional context for science vs finance topics

## User Flow

1. **Landing Page** → Split layout showcasing Science and Finance tracks
2. **Create Account** → Google or Apple OAuth via Cognito Hosted UI
3. **Profile Form** → 3-step form: personal info, science topics, finance topics
4. **Dashboard** → Select a topic, generate study notes from two AI tutors side-by-side

## Local Development

For local development without AWS:

```bash
# Install server dependencies
npm install

# Copy env file and add your API keys
cp .env.example .env

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:3000`.
