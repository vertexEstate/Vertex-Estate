import dns from 'node:dns';

const DEFAULT_DNS_SERVERS = ['8.8.8.8', '1.1.1.1', '8.8.4.4'];

/** Some ISP routers fail MongoDB Atlas SRV lookups (querySrv ESERVFAIL). Use public DNS for SRV. */
export function configureMongoDns(uri) {
  if (!uri?.includes('mongodb+srv')) return;
  const disabled = String(process.env.MONGODB_DNS_OVERRIDE ?? '').trim().toLowerCase() === 'false';
  if (disabled) return;

  const fromEnv = (process.env.MONGODB_DNS_SERVERS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const servers = fromEnv.length > 0 ? fromEnv : DEFAULT_DNS_SERVERS;

  try {
    dns.setServers(servers);
    console.log('[mongo] DNS for Atlas SRV:', servers.join(', '));
  } catch (e) {
    console.warn('[mongo] Could not set DNS servers:', e instanceof Error ? e.message : e);
  }
}

/** Avoid exposing raw MongoDB / DNS errors in API responses shown to visitors. */
export function sanitizeMongoError(error) {
  const msg = error instanceof Error ? error.message : String(error ?? 'Unknown error');
  if (/MONGODB_URI is not set|not configured/i.test(msg)) {
    return 'Lead storage is not configured yet. Please use WhatsApp to submit your request.';
  }
  if (
    /querySrv|ESERVFAIL|ENOTFOUND|ETIMEOUT|ECONNREFUSED|Server selection timed out|MongoNetworkError|MongoServerSelectionError|getaddrinfo/i.test(
      msg
    )
  ) {
    return 'We could not save your request right now. Please try again or send it via WhatsApp below.';
  }
  return 'Could not save your request. Please try again or use WhatsApp below.';
}
