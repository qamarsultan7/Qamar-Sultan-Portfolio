# Testing LLM Access to Your Portfolio

## How to Verify LLM Crawlers Can Access Your Site

### 1. Test robots.txt for LLM Directives

```bash
# Download your robots.txt
curl https://qamarsultan.me/robots.txt

# Should show:
# User-agent: GPTBot
# Allow: /
# User-agent: Claude-Web
# Allow: /
# etc.
```

### 2. Simulate LLM Crawler Requests

```bash
# Test as GPTBot
curl -H "User-Agent: Mozilla/5.0 (compatible; GPTBot/1.0; +https://openai.com/gptbot)" \
  https://qamarsultan.me/

# Test as Claude-Web
curl -H "User-Agent: Mozilla/5.0 (compatible; Claude-Web/1.0)" \
  https://qamarsultan.me/

# Test as Googlebot
curl -H "User-Agent: Mozilla/5.0 (compatible; Googlebot/2.1)" \
  https://qamarsultan.me/
```

### 3. Verify .well-known Files Are Accessible

```bash
# Check if .well-known/ai.json exists
curl https://qamarsultan.me/.well-known/ai.json

# Check if .well-known/schema.json exists
curl https://qamarsultan.me/.well-known/schema.json

# Check if .well-known/llm-access.json exists
curl https://qamarsultan.me/.well-known/llm-access.json

# All should return HTTP 200 OK
```

### 4. Validate JSON Structure

```bash
# Validate ai.json structure
curl https://qamarsultan.me/.well-known/ai.json | jq .

# Validate schema.json
curl https://qamarsultan.me/.well-known/schema.json | jq .

# Validate llm-access.json
curl https://qamarsultan.me/.well-known/llm-access.json | jq .
```

### 5. Check HTML Meta Tags

```bash
# Download HTML and check for LLM meta tags
curl https://qamarsultan.me/ | grep -i "ai-content-allowed\|llm-permission\|GPTBot"

# Should show:
# <meta name="ai-content-allowed" content="true">
# <meta name="llm-permission" content="allow">
# <meta name="GPTBot" content="allow">
# etc.
```

### 6. Monitor Server Logs for LLM Crawlers

```bash
# On your server, check for LLM crawler visits
tail -f /var/log/apache2/access.log | grep -E "GPTBot|Claude-Web|Googlebot|FacebookBot|BingBot"

# Example log entry:
# 203.0.113.45 - - [25/Apr/2026:14:30:00 +0000] "GET / HTTP/1.1" 200 5234
# "-" "Mozilla/5.0 (compatible; GPTBot/1.0; +https://openai.com/gptbot)"
```

## Expected Timeline

| Time | Event |
|------|-------|
| Immediate | .well-known files accessible |
| 24 hours | First LLM crawler visits |
| 48 hours | Multiple crawlers indexed your content |
| 1 week | Your content in LLM knowledge bases |
| 2 weeks | Full integration across all systems |

## Manual Testing

### Test 1: robots.txt Parsing
- Verify GPTBot is listed under allowed crawlers
- Verify disallowed bots (MJ12bot, AhrefsBot) are blocked

### Test 2: Meta Tag Parsing
- Check HTML source for LLM accessibility meta tags
- Verify all major LLM systems are mentioned

### Test 3: .well-known Directory
- All three JSON files should be accessible
- JSON should be valid and properly formatted
- Files should return proper content-type headers

### Test 4: Content Accessibility
- LLM crawlers should receive full content (200 OK)
- No redirect loops or errors
- Content should be readable and parseable

## Troubleshooting

### Issue: .well-known files return 404
**Solution:** Ensure .well-known directory is created and files are uploaded to correct location

### Issue: robots.txt not updated
**Solution:** Clear browser cache and re-fetch robots.txt

### Issue: LLM crawlers not visiting
**Solution:**
1. Verify robots.txt is publicly accessible
2. Wait 24-48 hours for crawlers to discover your site
3. Check server logs for crawl errors

### Issue: Meta tags not showing in HTML
**Solution:** Verify index.html was updated correctly with LLM meta tags

## Security Considerations

✅ LLM access is read-only (no data modification)
✅ Standard robots.txt controls apply
✅ Personal information (email, phone) is indexed but monitored
✅ Private information can be excluded if needed
✅ All access is logged and trackable

## Next Steps

1. Upload all files to production
2. Run tests from this guide
3. Monitor logs for crawler activity
4. Wait for knowledge base integration
5. Test with actual LLM queries (ask ChatGPT about you!)

## Testing Commands Cheat Sheet

```bash
# All-in-one test script
echo "🧪 Testing LLM Access..."

echo "1. Checking robots.txt..."
curl -s https://qamarsultan.me/robots.txt | head -20

echo ""
echo "2. Checking .well-known/ai.json..."
curl -s https://qamarsultan.me/.well-known/ai.json | jq . 2>/dev/null || echo "Not accessible"

echo ""
echo "3. Checking .well-known/schema.json..."
curl -s https://qamarsultan.me/.well-known/schema.json | jq . 2>/dev/null || echo "Not accessible"

echo ""
echo "4. Checking .well-known/llm-access.json..."
curl -s https://qamarsultan.me/.well-known/llm-access.json | jq . 2>/dev/null || echo "Not accessible"

echo ""
echo "5. Simulating GPTBot crawl..."
curl -s -H "User-Agent: Mozilla/5.0 (compatible; GPTBot/1.0)" https://qamarsultan.me/ | head -50

echo ""
echo "✅ Tests complete!"
```

---
For full details, see LLM_ACCESSIBILITY_GUIDE.md
