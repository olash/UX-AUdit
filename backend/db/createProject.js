import { supabase } from "./supabase.js";
import { URL } from "url";

export async function createProject(url, userId) {
    try {
        const hostname = new URL(url).hostname;
        const { data, error } = await supabase
            .from('projects')
            .insert({
                name: `Audit of ${hostname}`,
                target_url: url,
                user_id: userId,
                status: 'running' // Explicitly set status
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (err) {
        console.error("Error creating project:", err);
        throw err;
    }
}
