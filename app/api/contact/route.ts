import { NextRequest, NextResponse } from 'next/server';
import integrations from '@/app/json/config/integrations.json';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, department, subject, message } = body || {};

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const webhookUrl = (integrations as any).discordWebhookUrl as string | undefined;
    if (!webhookUrl) {
      return NextResponse.json(
        { success: false, error: 'Discord webhook URL not configured' },
        { status: 500 }
      );
    }

    const embed = {
      username: 'Expanse Contact Form',
      embeds: [
        {
          title: 'New Contact Form Submission',
          color: 0x00AEEF,
          fields: [
            { name: 'Name', value: String(name), inline: true },
            { name: 'Email', value: String(email), inline: true },
            { name: 'Department', value: String(department || 'N/A'), inline: false },
            { name: 'Subject', value: String(subject), inline: false },
            { name: 'Message', value: String(message).slice(0, 1900), inline: false },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const resp = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(embed),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      return NextResponse.json(
        { success: false, error: `Discord webhook error: ${resp.status} ${errText}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}


