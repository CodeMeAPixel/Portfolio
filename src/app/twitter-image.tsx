import { ImageResponse } from "next/og";
import { DATA } from "@/data/resume";

export const runtime = "edge";

export const alt = DATA.name;
export const size = {
    width: 1024,
    height: 576,
};
export const contentType = "image/png";

const getFontData = async () => {
    try {
        const [cabinetGrotesk, clashDisplay] = await Promise.all([
            fetch(
                new URL("../../public/fonts/CabinetGrotesk-Medium.ttf", import.meta.url)
            ).then((res) => res.arrayBuffer()),
            fetch(
                new URL("../../public/fonts/ClashDisplay-Semibold.ttf", import.meta.url)
            ).then((res) => res.arrayBuffer()),
        ]);
        return { cabinetGrotesk, clashDisplay };
    } catch (error) {
        console.error("Failed to load fonts:", error);
        return null;
    }
};

const styles = {
    outerWrapper: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0a0a0a",
        position: "relative",
    },
    middleWrapper: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0a0a0a",
        position: "relative",
        padding: "32px",
    },
    wrapper: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#1a1a1a",
        position: "relative",
        padding: "32px",
        border: "1px solid #333333",
        borderRadius: "8px",
    },
    imageSection: {
        position: "absolute",
        top: "32px",
        left: "32px",
        display: "flex",
        alignItems: "center",
        zIndex: "2",
    },
    mainContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        height: "100%",
        width: "100%",
        position: "relative",
        zIndex: "1",
    },
    image: {
        width: "120px",
        height: "120px",
        borderRadius: "20px",
        border: "3px solid #333333",
        objectFit: "cover",
    },
    title: {
        fontFamily: "Clash Display",
        fontSize: "40px",
        fontWeight: "600",
        lineHeight: "1.1",
        textAlign: "left",
        color: "#ffffff",
        marginBottom: "12px",
        letterSpacing: "-0.02em",
        maxWidth: "800px",
    },
    description: {
        fontSize: "18px",
        fontWeight: "400",
        lineHeight: "1.4",
        textAlign: "left",
        maxWidth: "700px",
        color: "#a0a0a0",
        textWrap: "balance",
    },
} as const;

export default async function Image() {
    try {
        const fontData = await getFontData();
        const imageUrl = DATA.avatarUrl
            ? new URL(DATA.avatarUrl, DATA.url).toString()
            : undefined;

        return new ImageResponse(
            (
                <div style={styles.outerWrapper}>
                    <div style={styles.middleWrapper}>
                        <div style={styles.wrapper}>
                            {imageUrl && (
                                <div style={styles.imageSection}>
                                    <img src={imageUrl} alt={DATA.name} style={styles.image} width={120} height={120} />
                                </div>
                            )}
                            <div style={styles.mainContainer}>
                                <div style={styles.title}>{DATA.name}</div>
                                {DATA.description && (
                                    <div style={styles.description}>{DATA.description}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ),
            {
                ...size,
                fonts: fontData
                    ? [
                        {
                            name: "Cabinet Grotesk",
                            data: fontData.cabinetGrotesk,
                            weight: 400,
                            style: "normal",
                        },
                        {
                            name: "Cabinet Grotesk",
                            data: fontData.cabinetGrotesk,
                            weight: 700,
                            style: "normal",
                        },
                        {
                            name: "Clash Display",
                            data: fontData.clashDisplay,
                            weight: 600,
                            style: "normal",
                        },
                    ]
                    : undefined,
            }
        );
    } catch (error) {
        console.error("Error generating Twitter image:", error);
        return new Response(
            `Failed to generate image: ${error instanceof Error ? error.message : "Unknown error"}`,
            {
                status: 500,
            }
        );
    }
}
