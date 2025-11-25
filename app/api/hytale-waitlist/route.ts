import { NextRequest, NextResponse } from 'next/server';
import integrations from '@/app/json/config/integrations.json';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body || {};

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
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
      username: 'Expanse Hytale Waitlist',
      embeds: [
        {
          title: '🎮 New Hytale Waitlist Signup',
          color: 0x00AEEF,
          fields: [
            { name: 'Email', value: String(email), inline: false },
            { name: 'Timestamp', value: new Date().toLocaleString('en-US', { timeZone: 'UTC' }), inline: false },
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: 'Hytale Hosting Waitlist',
          },
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

