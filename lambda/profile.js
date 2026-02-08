/* ═══════════════════════════════════════════
   NeuroNum.ai — Profile Lambda Handler
   ═══════════════════════════════════════════
   GET  /api/profile — Get user profile from DynamoDB
   PUT  /api/profile — Create/update user profile
   ═══════════════════════════════════════════ */

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand, PutCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE = process.env.PROFILES_TABLE || 'neuronum-profiles';

function corsHeaders() {
  const allowed = process.env.ALLOWED_ORIGIN || '*';
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
    'Content-Type': 'application/json',
  };
}

function getUserId(event) {
  // API Gateway Cognito authorizer puts claims here
  return event.requestContext?.authorizer?.claims?.sub
    || event.requestContext?.authorizer?.jwt?.claims?.sub
    || null;
}

exports.handler = async (event) => {
  const headers = corsHeaders();
  const method = event.httpMethod || event.requestContext?.http?.method;

  // CORS preflight
  if (method === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const userId = getUserId(event);
  if (!userId) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Unauthorized' }),
    };
  }

  try {
    if (method === 'GET') {
      // ── Get profile ──
      const result = await docClient.send(new GetCommand({
        TableName: TABLE,
        Key: { userId },
      }));

      if (!result.Item) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Profile not found' }),
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result.Item),
      };

    } else if (method === 'PUT') {
      // ── Create/update profile ──
      const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

      const { first_name, last_name, grade, state, township, high_school, science_topics, finance_topics, email } = body;

      if (!first_name || !last_name || !grade || !state || !township || !high_school) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Missing required profile fields' }),
        };
      }

      const item = {
        userId,
        email: email || '',
        first_name,
        last_name,
        grade: Number(grade),
        state,
        township,
        high_school,
        science_topics: science_topics || [],
        finance_topics: finance_topics || [],
        updated_at: new Date().toISOString(),
      };

      // Check if this is a new profile (add created_at)
      const existing = await docClient.send(new GetCommand({
        TableName: TABLE,
        Key: { userId },
      }));

      if (!existing.Item) {
        item.created_at = new Date().toISOString();
      } else {
        item.created_at = existing.Item.created_at;
      }

      await docClient.send(new PutCommand({
        TableName: TABLE,
        Item: item,
      }));

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Profile saved', profile: item }),
      };

    } else {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Method not allowed' }),
      };
    }

  } catch (err) {
    console.error('Profile handler error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
