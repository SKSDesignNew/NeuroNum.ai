#!/usr/bin/env bash
set -euo pipefail

# ═══════════════════════════════════════════
# NeuroNum.ai — AWS Deployment Script
# ═══════════════════════════════════════════
# Deploys the full backend stack:
#   Cognito + DynamoDB + Lambda + API Gateway
#
# Prerequisites:
#   - AWS CLI configured (aws configure)
#   - AWS SAM CLI installed
#   - Node.js 18+
#
# Usage:
#   ./scripts/deploy.sh              # Interactive guided deploy
#   ./scripts/deploy.sh --no-confirm # Skip confirmation prompts
# ═══════════════════════════════════════════

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LAMBDA_DIR="$PROJECT_DIR/lambda"
STACK_NAME="neuronum-ai"
REGION="${AWS_REGION:-us-east-1}"

echo ""
echo "╔═══════════════════════════════════════════╗"
echo "║   NeuroNum.ai — Full AWS Deployment       ║"
echo "║   Cognito + DynamoDB + Lambda + API GW     ║"
echo "╚═══════════════════════════════════════════╝"
echo ""

# ── Step 1: Install Lambda dependencies ──
echo "→ [1/4] Installing Lambda dependencies..."
cd "$LAMBDA_DIR"
npm install --production
cd "$PROJECT_DIR"
echo "  Done."
echo ""

# ── Step 2: Validate SAM template ──
echo "→ [2/4] Validating SAM template..."
sam validate --template-file template.yaml --region "$REGION"
echo "  Template valid."
echo ""

# ── Step 3: Build ──
echo "→ [3/4] Building SAM application..."
sam build --template-file template.yaml
echo "  Build complete."
echo ""

# ── Step 4: Deploy ──
echo "→ [4/4] Deploying to AWS ($REGION)..."
echo ""

if [[ "${1:-}" == "--no-confirm" ]]; then
  sam deploy \
    --stack-name "$STACK_NAME" \
    --region "$REGION" \
    --capabilities CAPABILITY_IAM \
    --resolve-s3 \
    --no-confirm-changeset
else
  sam deploy \
    --stack-name "$STACK_NAME" \
    --region "$REGION" \
    --capabilities CAPABILITY_IAM \
    --resolve-s3 \
    --guided
fi

echo ""
echo "═══════════════════════════════════════════"
echo ""

# ── Print outputs ──
echo "→ Stack outputs:"
echo ""
aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --region "$REGION" \
  --query 'Stacks[0].Outputs' \
  --output table 2>/dev/null || echo "  (Run manually to see outputs)"

echo ""
echo "═══════════════════════════════════════════"
echo ""
echo "NEXT STEPS:"
echo ""
echo "  1. From the outputs above, copy these values:"
echo "       - ApiUrl"
echo "       - CognitoDomain"
echo "       - CognitoClientId"
echo ""
echo "  2. In the AWS Amplify Console, add these env variables:"
echo "       COGNITO_DOMAIN       = <CognitoDomain>"
echo "       COGNITO_CLIENT_ID    = <CognitoClientId>"
echo "       COGNITO_REDIRECT_URI = https://yourdomain.com/auth.html"
echo "       COGNITO_LOGOUT_URI   = https://yourdomain.com/"
echo "       COGNITO_REGION       = $REGION"
echo "       API_BASE_URL         = <ApiUrl>"
echo ""
echo "  3. Trigger a new Amplify build (push or click Redeploy)"
echo ""
echo "  4. In Cognito Console, update the App Client:"
echo "       - Callback URL → https://yourdomain.com/auth.html"
echo "       - Sign-out URL → https://yourdomain.com/"
echo "       - Add Google and/or Apple to Supported Identity Providers"
echo ""
echo "Done!"
echo ""
