#!/usr/bin/env bash
set -euo pipefail

# ═══════════════════════════════════════════
# NeuroNum.ai — Deployment Script
# ═══════════════════════════════════════════
# Deploys the Lambda backend via AWS SAM.
# Frontend is deployed automatically by Amplify
# when you push to the connected branch.
#
# Prerequisites:
#   - AWS CLI configured (aws configure)
#   - AWS SAM CLI installed (brew install aws-sam-cli)
#   - Node.js 18+
#
# Usage:
#   ./scripts/deploy.sh                    # Interactive guided deploy
#   ./scripts/deploy.sh --no-confirm       # Skip confirmation prompts
# ═══════════════════════════════════════════

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LAMBDA_DIR="$PROJECT_DIR/lambda"
STACK_NAME="neuronum-ai-backend"
REGION="${AWS_REGION:-us-east-1}"

echo ""
echo "╔══════════════════════════════════════╗"
echo "║   NeuroNum.ai — Backend Deployment   ║"
echo "╚══════════════════════════════════════╝"
echo ""

# ── Step 1: Install Lambda dependencies ──
echo "→ Installing Lambda dependencies..."
cd "$LAMBDA_DIR"
npm install --production
cd "$PROJECT_DIR"
echo "  Done."
echo ""

# ── Step 2: Validate SAM template ──
echo "→ Validating SAM template..."
sam validate --template-file template.yaml --region "$REGION"
echo "  Template is valid."
echo ""

# ── Step 3: Build ──
echo "→ Building SAM application..."
sam build --template-file template.yaml
echo "  Build complete."
echo ""

# ── Step 4: Deploy ──
echo "→ Deploying to AWS ($REGION)..."
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

# ── Step 5: Print outputs ──
echo "→ Deployment outputs:"
echo ""
aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --region "$REGION" \
  --query 'Stacks[0].Outputs' \
  --output table 2>/dev/null || echo "  (Run 'aws cloudformation describe-stacks --stack-name $STACK_NAME' to see outputs)"

echo ""
echo "═══════════════════════════════════════════"
echo ""
echo "NEXT STEPS:"
echo ""
echo "  1. Copy the ApiUrl from the outputs above"
echo "  2. In the Amplify Console, add environment variable:"
echo "       API_BASE_URL = <ApiUrl value>"
echo "  3. Trigger a new Amplify build (push a commit or click 'Redeploy')"
echo "  4. If using a custom domain for the API, create a CNAME/ALIAS"
echo "     DNS record pointing to the ApiDistribution value above"
echo ""
echo "Done! Your backend is live."
echo ""
