import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const data = body.data || {};
        const info = data.personal_info || {};
        const exp = data.experience || [];
        const skills = data.skills || [];

        // Construct dynamic markdown based on input
        let resumeMD = `# ${info.name || "Candidate Name"}\n\n`;
        resumeMD += `**${data.target_role || "Target Role"}**\n\n`;

        const contactParts = [info.email, info.phone, info.location, info.linkedin].filter(Boolean);
        resumeMD += `${contactParts.join(' | ')}\n\n`;

        if (data.summary) {
            resumeMD += `## Summary\n${data.summary}\n\n`;
        }

        if (exp.length > 0) {
            resumeMD += `## Experience\n`;
            exp.forEach((job: any) => {
                resumeMD += `**${job.title}** | ${job.company} (${job.duration || "N/A"})\n`;
                if (job.highlights && job.highlights.length > 0) {
                    job.highlights.forEach((h: string) => resumeMD += `- ${h}\n`);
                }
                resumeMD += '\n';
            });
        }

        if (data.education && data.education.length > 0) {
            resumeMD += `## Education\n`;
            data.education.forEach((edu: any) => {
                resumeMD += `**${edu.degree}**\n${edu.institution} (${edu.year})\n\n`;
            });
        }

        if (skills.length > 0) {
            resumeMD += `## Skills\n- ${skills.join(', ')}\n\n`;
        }

        return NextResponse.json({
            status: "ok",
            resume: resumeMD
        });
    } catch (error) {
        console.error('[resume/generate] Error:', error);
        return NextResponse.json(
            { status: "error", message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
