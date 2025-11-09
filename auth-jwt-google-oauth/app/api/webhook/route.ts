import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'your-webhook-secret';

export async function POST(req: NextRequest) {
  try {
    // Verify webhook secret
    const secret = req.headers.get('x-webhook-secret');
    
    if (secret !== WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Invalid webhook secret' },
        { status: 401 }
      );
    }

    // Parse webhook payload
    const payload = await req.json();
    
    console.log('📥 Webhook received:', {
      timestamp: new Date().toISOString(),
      event: payload.event,
      data: payload.data,
    });

    // Process different webhook events
    switch (payload.event) {
      case 'user.created':
        console.log('✅ User created event:', payload.data);
        break;
      case 'user.updated':
        console.log('✅ User updated event:', payload.data);
        break;
      case 'user.deleted':
        console.log('✅ User deleted event:', payload.data);
        break;
      default:
        console.log('⚠️ Unknown event type:', payload.event);
    }

    // Log to see in response
    return NextResponse.json({
      message: 'Webhook received successfully',
      received: {
        event: payload.event,
        timestamp: new Date().toISOString(),
      },
      processed: true,
    });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to check webhook status
export async function GET() {
  return NextResponse.json({
    status: 'Webhook endpoint is active',
    supportedEvents: [
      'user.created',
      'user.updated',
      'user.deleted',
    ],
  });
}