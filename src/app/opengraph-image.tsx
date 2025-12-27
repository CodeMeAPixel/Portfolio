import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'CodeMeAPixel | Portfolio';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #0f0815 0%, #1a0a20 25%, #12081a 50%, #0a0510 100%)',
                    position: 'relative',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    padding: '40px',
                }}
            >
                {/* Animated gradient orbs background */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-100px',
                        right: '-50px',
                        width: '500px',
                        height: '500px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(230, 50, 40, 0.3) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-150px',
                        left: '-100px',
                        width: '600px',
                        height: '600px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(255, 80, 60, 0.2) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '400px',
                        height: '400px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(200, 40, 35, 0.15) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                    }}
                />

                {/* Grid pattern overlay */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `
              linear-gradient(rgba(230, 50, 40, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(230, 50, 40, 0.03) 1px, transparent 1px)
            `,
                        backgroundSize: '50px 50px',
                    }}
                />

                {/* Main content card */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '50px 70px',
                        borderRadius: '32px',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 100px rgba(230, 50, 40, 0.15)',
                        position: 'relative',
                    }}
                >
                    {/* Shine effect */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                        }}
                    />

                    {/* Logo/Icon */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '80px',
                            height: '80px',
                            borderRadius: '20px',
                            background: 'linear-gradient(135deg, rgba(230, 50, 40, 0.3) 0%, rgba(255, 80, 60, 0.2) 100%)',
                            border: '1px solid rgba(230, 50, 40, 0.3)',
                            marginBottom: '24px',
                            boxShadow: '0 0 40px rgba(230, 50, 40, 0.3)',
                        }}
                    >
                        <span style={{ fontSize: '40px', color: '#fff' }}>{`</>`}</span>
                    </div>

                    {/* Title */}
                    <h1
                        style={{
                            fontSize: '64px',
                            fontWeight: 900,
                            background: 'linear-gradient(135deg, #ffffff 0%, #e63228 50%, #ff5040 100%)',
                            backgroundClip: 'text',
                            color: 'transparent',
                            margin: 0,
                            letterSpacing: '-2px',
                            textAlign: 'center',
                        }}
                    >
                        CodeMeAPixel
                    </h1>

                    {/* Subtitle */}
                    <p
                        style={{
                            fontSize: '24px',
                            color: 'rgba(255,255,255,0.7)',
                            margin: '12px 0 0 0',
                            fontWeight: 500,
                            letterSpacing: '0.5px',
                        }}
                    >
                        Full-Stack Developer & Designer
                    </p>

                    {/* Tagline */}
                    <p
                        style={{
                            fontSize: '18px',
                            color: 'rgba(255,255,255,0.5)',
                            margin: '16px 0 0 0',
                            fontWeight: 400,
                            maxWidth: '480px',
                            textAlign: 'center',
                            lineHeight: 1.5,
                        }}
                    >
                        Building beautiful, functional web experiences with modern technologies
                    </p>

                    {/* Tech badges */}
                    <div
                        style={{
                            display: 'flex',
                            gap: '10px',
                            marginTop: '24px',
                        }}
                    >
                        {['Next.js', 'React', 'TypeScript', 'Node.js'].map((tech) => (
                            <div
                                key={tech}
                                style={{
                                    padding: '6px 14px',
                                    borderRadius: '16px',
                                    background: 'rgba(230, 50, 40, 0.15)',
                                    border: '1px solid rgba(230, 50, 40, 0.3)',
                                    fontSize: '13px',
                                    color: 'rgba(255,255,255,0.8)',
                                    fontWeight: 500,
                                }}
                            >
                                {tech}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom URL */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <div
                        style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#22c55e',
                            boxShadow: '0 0 10px #22c55e',
                        }}
                    />
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px' }}>
                        codemeapixel.dev
                    </span>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
