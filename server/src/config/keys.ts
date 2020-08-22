export default {
    PGUSER:process.env.PG_USER || '',
    PGHOST:process.env.PG_HOST || '',
    PGDATABASE:process.env.PG_DATABASE || '',
    PGPASSWORD:process.env.PG_PASSWORD || '',
    PGPORT:process.env.PG_PORT || '',
    UPLOADKEY:process.env.UPLOAD_KEY || '',
    UPLOADSECRET:process.env.UPLOAD_SECRET || '',
    ASSETS_BUCKET:process.env.ASSETS_BUCKET || ''
}

