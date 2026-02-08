#!/bin/bash
# Generate js/env-config.js from Amplify environment variables
echo "window.__ENV__ = {" > js/env-config.js
echo "  COGNITO_DOMAIN: '$COGNITO_DOMAIN'," >> js/env-config.js
echo "  COGNITO_CLIENT_ID: '$COGNITO_CLIENT_ID'," >> js/env-config.js
echo "  COGNITO_REDIRECT_URI: '$COGNITO_REDIRECT_URI'," >> js/env-config.js
echo "  COGNITO_LOGOUT_URI: '$COGNITO_LOGOUT_URI'," >> js/env-config.js
echo "  COGNITO_REGION: '$COGNITO_REGION'," >> js/env-config.js
echo "  API_BASE: '$API_BASE_URL'" >> js/env-config.js
echo "};" >> js/env-config.js
cat js/env-config.js
echo "env-config.js generated successfully"
