import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    )

    const { data: submissions, error } = await supabaseClient
      .from("submissions")
      .select("*")
      .order("created_at", { ascending: true })

    if (error) throw error

    const timestamp = new Date().toISOString().split("T")[0]
    const filename = `backup_submissions_${timestamp}.json`

    const backup = {
      created_at: new Date().toISOString(),
      total_submissions: submissions.length,
      data: submissions,
    }

    const jsonData = JSON.stringify(backup, null, 2)

    const { error: storageError } = await supabaseClient.storage
      .from("backups")
      .upload(`submissions/${filename}`, jsonData, {
        contentType: "application/json",
        upsert: true,
      })

    if (storageError) throw storageError

    return new Response(
      JSON.stringify({
        success: true,
        message: `Backup created: ${filename}`,
        submissions_count: submissions.length,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    )
  }
})
