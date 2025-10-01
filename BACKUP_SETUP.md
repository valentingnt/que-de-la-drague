# Backup System Setup

## Overview

The backup system automatically saves all submissions to Supabase Storage as JSON files.

## Setup Instructions

### 1. Create Storage Bucket

In your Supabase dashboard:

1. Go to Storage
2. Create a new bucket named `backups`
3. Set it as private (admin access only)

### 2. Deploy Edge Function

```bash
# Login to Supabase
npx supabase login

# Link your project
npx supabase link --project-ref pdygxdmtdmzxcaaacfmf

# Deploy the function
npx supabase functions deploy backup-submissions
```

### 3. Set up Scheduled Backup (Manual)

You can trigger the backup manually via:

```bash
curl -X POST https://pdygxdmtdmzxcaaacfmf.supabase.co/functions/v1/backup-submissions \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

### 4. Automated Daily Backup (Using Cron Job or GitHub Actions)

#### Option A: GitHub Actions (Recommended)

Create `.github/workflows/backup.yml`:

```yaml
name: Daily Backup
on:
  schedule:
    - cron: "0 2 * * *" # Run at 2 AM daily
  workflow_dispatch:

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Backup
        run: |
          curl -X POST https://pdygxdmtdmzxcaaacfmf.supabase.co/functions/v1/backup-submissions \
            -H "Authorization: Bearer ${{ secrets.SUPABASE_ANON_KEY }}"
```

#### Option B: Server Cron Job

Add to your server's crontab:

```bash
0 2 * * * curl -X POST https://pdygxdmtdmzxcaaacfmf.supabase.co/functions/v1/backup-submissions -H "Authorization: Bearer YOUR_ANON_KEY"
```

### 5. Verify Backups

Check your Supabase Storage dashboard under the `backups/submissions/` folder.

## Backup Format

Backups are saved as JSON files with this structure:

```json
{
  "created_at": "2025-01-01T02:00:00.000Z",
  "total_submissions": 150,
  "data": [
    {
      "id": "uuid",
      "message": "...",
      "signature": "...",
      "created_at": "...",
      "user_agent": "...",
      "referrer": "..."
    }
  ]
}
```

## Restore from Backup

To restore from a backup:

1. Download the JSON file from Supabase Storage
2. Use Supabase SQL Editor or API to insert the data back

## Manual Backup

You can also trigger backups from the admin dashboard (future feature) or manually via the Supabase dashboard.
