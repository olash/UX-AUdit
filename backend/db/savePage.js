import { supabase } from "./supabase.js";

export async function savePage({ projectId, url, screenshotPath }) {
    const { data, error } = await supabase
        .from("pages")
        .insert({
            project_id: projectId,
            url,
            screenshot_url: screenshotPath
        })
        .select()
        .single();

    if (error) throw error;

    return data;
}
