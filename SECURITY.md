# 🔐 Security Guidelines

This document outlines critical security practices for the CryptoTrade Bot project.

## ⚠️ Critical Security Rules

### 1. **Never Commit Secrets**
- ❌ **DO NOT** commit API keys, private keys, or tokens to the repository
- ✅ **DO** use environment variables for all sensitive data
- ✅ **DO** store secrets in `.env.local` (which is git-ignored)
- ✅ **DO** use a secrets manager for production (AWS Secrets Manager, HashiCorp Vault, etc.)

### 2. **Environment Variables Template**

Create a `.env.example` file to document required variables (without values):

```env
# Telegram Bot Configuration
VITE_TELEGRAM_BOT_TOKEN=xxx_your_token_here_xxx

# Exchange API Keys
VITE_CRYPTO_API_KEY=xxx_your_key_here_xxx
VITE_EXCHANGE_API_KEY=xxx_your_key_here_xxx
VITE_EXCHANGE_API_SECRET=xxx_your_secret_here_xxx

# Wallet Configuration
VITE_WALLET_PRIVATE_KEY=xxx_your_key_here_xxx
VITE_WALLET_MNEMONIC=xxx_your_mnemonic_here_xxx

# Database
DATABASE_URL=xxx_your_url_here_xxx

# Feature Flags
VITE_ENABLE_REAL_TRADING=false
VITE_API_RATE_LIMIT=100
```

### 3. **API Key Management**

#### For Local Development
- Use `.env.local` with your actual secrets
- Never commit this file
- Rotate keys regularly
- Use read-only API keys where possible

#### For Production
- Use environment secrets in deployment platform:
  - **Vercel**: Project Settings → Environment Variables
  - **Netlify**: Site Settings → Build & deploy → Environment
  - **Docker**: Use Docker secrets or environment variable injection
  - **Node.js**: Use process.env with secure injection

### 4. **Wallet & Private Key Security**

```typescript
// ❌ NEVER DO THIS
const privateKey = "0x1234567890abcdef...";

// ✅ DO THIS
const privateKey = import.meta.env.VITE_WALLET_PRIVATE_KEY;
if (!privateKey) {
  throw new Error("VITE_WALLET_PRIVATE_KEY is not set");
}

// ✅ OR BETTER: Use a secure key management service
import { getSecret } from "~/server/security/vault";
const privateKey = await getSecret("wallet_private_key");
```

### 5. **Telegram Bot Token Security**

```typescript
// Server-side only (never expose to client)
const botToken = process.env.TELEGRAM_BOT_TOKEN;

// For client-side Telegram Mini App, use the Web App token
// which is automatically secure via Telegram's SDK
const webApp = window.Telegram?.WebApp;
```

### 6. **API Rate Limiting & DDoS Protection**

```typescript
// composables/useRateLimiter.ts
export const useRateLimiter = () => {
  const maxRequests = parseInt(import.meta.env.VITE_API_RATE_LIMIT || "100");
  const timeWindow = 60000; // 1 minute
  
  const requests: number[] = [];
  
  const isAllowed = (): boolean => {
    const now = Date.now();
    const recentRequests = requests.filter(time => now - time < timeWindow);
    
    if (recentRequests.length >= maxRequests) {
      return false;
    }
    
    requests.push(now);
    return true;
  };
  
  return { isAllowed };
};
```

### 7. **Input Validation & Sanitization**

```typescript
// utils/validation.ts
import DOMPurify from "dompurify";

export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
};

export const validateTradeAmount = (amount: number): boolean => {
  if (typeof amount !== "number" || amount <= 0) return false;
  if (amount > 1_000_000) return false; // Max reasonable trade
  if (!Number.isFinite(amount)) return false;
  return true;
};
```

### 8. **CORS & CSRF Protection**

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    headers: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    },
    security: {
      nonce: true,
      contentSecurityPolicy: {
        base: ["'self'"],
        script: ["'self'", "'unsafe-inline'", "telegram.org", "cdn.jsdelivr.net"],
      },
    },
  },
});
```

### 9. **Logging Security Events**

```typescript
// server/security/logger.ts
export const logSecurityEvent = (event: {
  type: "auth_failure" | "api_error" | "rate_limit" | "invalid_trade";
  userId?: string;
  details: Record<string, any>;
  timestamp: Date;
}) => {
  // Never log secrets, private keys, or sensitive data
  console.log(`[SECURITY] ${event.type}:`, {
    timestamp: event.timestamp,
    userId: event.userId,
    // Log only safe details
    ...Object.entries(event.details)
      .filter(([key]) => !["password", "key", "token", "secret"].some(s => key.includes(s)))
      .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {}),
  });
};
```

### 10. **Content Security Policy**

```typescript
// Strict CSP headers to prevent XSS and injection attacks
const cspHeaders = {
  "Content-Security-Policy": 
    "default-src 'self'; " +
    "script-src 'self' telegram.org cdn.jsdelivr.net; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' https: data:; " +
    "font-src 'self' data:; " +
    "connect-src 'self' api.coingecko.com api.telegram.org; " +
    "frame-ancestors 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self';",
};
```

## 🔒 Pre-commit Hooks

Install and configure git hooks to prevent accidental secret commits:

```bash
npm install --save-dev husky lint-staged

# Initialize husky
npx husky install

# Create pre-commit hook
npx husky add .husky/pre-commit "npm run lint:secrets"
```

```json
// package.json
{
  "scripts": {
    "lint:secrets": "detect-secrets scan --baseline .secrets.baseline",
    "prepare": "husky install"
  }
}
```

## 🛡️ Deployment Security Checklist

- [ ] All environment variables are set in deployment platform (not in code)
- [ ] HTTPS/TLS is enabled for all endpoints
- [ ] API keys are rotated every 90 days
- [ ] Database credentials are separate from application code
- [ ] Access logs are monitored for suspicious activity
- [ ] Rate limiting is enabled on all public endpoints
- [ ] CORS is configured to allow only trusted domains
- [ ] Database backups are encrypted at rest
- [ ] Sensitive data is encrypted in transit (TLS 1.2+)
- [ ] Security headers are configured (CSP, X-Frame-Options, etc.)
- [ ] Regular security audits are performed

## 📋 Sensitive Data That Must Be Protected

- ✅ Telegram Bot Tokens
- ✅ Exchange API Keys & Secrets
- ✅ Wallet Private Keys
- ✅ Database Credentials
- ✅ OAuth Tokens
- ✅ User Wallet Addresses (with caution)
- ✅ Transaction History (with PII)
- ✅ Seeds & Mnemonics

## 🚨 If You Accidentally Commit a Secret

1. **DO NOT PANIC** - The secret is likely still safe if not pushed yet
2. Run: `git reset HEAD~1` to unstage the commit
3. Remove the secret from files
4. Amend: `git add . && git commit --amend`
5. If already pushed to main:
   - Force push: `git push -f origin main` (only if you own the repo)
   - **Immediately rotate the exposed secret**
   - Notify your team
   - Check if the secret was used maliciously

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Vue.js Security](https://vuejs.org/guide/best-practices/security.html)
- [Telegram Bot Security](https://core.telegram.org/bots/webapps#security-considerations)

## 🤝 Reporting Security Issues

If you discover a security vulnerability, **DO NOT** open a public issue. Instead:
1. Email: security@yourdomainhere.com (create this if needed)
2. Include details about the vulnerability
3. Give us 30 days to respond and patch
4. Do not disclose until we've released a fix

---

**Remember**: Security is everyone's responsibility. Always think before committing! 🔐
