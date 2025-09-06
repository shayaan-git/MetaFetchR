// Using Regex-UUID validator for stricter validation, a pattern for string format
export const isUUID = (value = '') =>
    // return typeof value === 'string' && value.length > 0;
    // Using the strict way the Regex (but this one will accept all UUIDs, not just v4/v5.)
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);

export const isURL = (value = '') => {
    try {
        const u = new URL(value); // parse URL and throws if invalid
        return !!u.protocol && !!u.hostname;  // valid URL must have protocol and hostname
    } catch {
        return false;   // if invalid URL
    }
};

// Mapping camelCase body fields to DB snake_case safely
export const toDbWebsiteFields = (body = {}) => {
    const out = {};
    if (body.url !== undefined) out.url = body.url; // copy url as-is
    if (body.brandName !== undefined) out.brand_name = body.brandName;  // camel → snake
    if (body.description !== undefined) out.description = body.description; 
    return out;
};
