
import { useEffect } from "react";
import "./Handasiyan3DProjects.css";

export default function Handasiyan3DProjects() {
    useEffect(() => {
        document.title = "Handasiyan 3D Projects";

        const description = document.querySelector(
            'meta[name="description"]'
        );

        if (description) {
            description.content =
                "Four residential design concepts by Handasiyan in East Airport, Accra. Open each one in 3D.";
        }

        return () => {
            document.title = "Handasiyan Construction";
        };
    }, []);

    return (
        <>
            {/* <Navbar /> */}

            
            <div className="handasiyan-3d-page">
                <section className="hero">
                    <img
                        src="/3d/img/hero.jpg"
                        alt="Palm Court villas at dusk, 3D render"
                        width="1600"
                        height="1000"
                    />

                    <div className="shade" />

                    <div className="cap">
                        <div className="in">
                            <p className="eyebrow">
                                Design concepts · East Airport, Accra
                            </p>
                            <h1>Walk through our designs in 3D</h1>
                        </div>
                    </div>
                </section>

                <section className="in intro">
                    <p>
                        Four residential concepts drawn by our architects and
                        engineers for a plot in East Airport. Open any of them,
                        turn it around, and cut it floor by floor to see how
                        the homes work inside.
                    </p>

                    <div className="actions">
                        <a
                            className="btn gold"
                            href="https://wa.me/233596399006?text=Hello%20Handasiyan%2C%20I%20saw%20your%203D%20designs%20and%20I%20would%20like%20to%20talk%20about%20a%20project."
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Chat on WhatsApp
                        </a>
                    </div>
                </section>

                <main className="in grid">
                    <article className="card">
                        <a
                            className="pic"
                            href="/3d/palm-court.html"
                            aria-label="Open the Palm Court 3D model"
                        >
                            <img
                                src="/3d/img/palm-court.jpg"
                                alt="Palm Court, 3D design concept"
                                width="1200"
                                height="750"
                            />
                        </a>
                        <h2>Palm Court</h2>
                        <p className="spec">
                            3 detached villas · 4 bedrooms · G+1 · 197 m² each
                        </p>
                        <p className="d">
                            A private palm-lined lane. Every villa gets its own
                            gated 2-car court and garden, with a bronze Adinkra
                            screen framed in charcoal.
                        </p>
                        <a className="open" href="/3d/palm-court.html" target="_blank">
                            Open the 3D model →
                        </a>
                    </article>

                    <article className="card">
                        <a
                            className="pic"
                            href="/3d/kente-lanterns.html"
                            aria-label="Open the Kente Lanterns 3D model"
                        >
                            <img
                                src="/3d/img/kente-lanterns.jpg"
                                alt="Kente Lanterns, 3D design concept"
                                width="1200"
                                height="750"
                            />
                        </a>
                        <h2>Kente Lanterns</h2>
                        <p className="spec">
                            4 detached villas · 4 bedrooms · G+2 · 273 to 284 m²
                        </p>
                        <p className="d">
                            Bronze screens cut in a Kente pattern wrap the upper
                            floors and glow at night like lanterns. Two of the
                            villas carry a roof pool.
                        </p>
                        <a className="open" href="/3d/kente-lanterns.html" target="_blank">
                            Open the 3D model →
                        </a>
                    </article>

                    <article className="card">
                        <a
                            className="pic"
                            href="/3d/floating-box.html"
                            aria-label="Open the Floating Box 3D model"
                        >
                            <img
                                src="/3d/img/floating-box.jpg"
                                alt="Floating Box, 3D design concept"
                                width="1200"
                                height="750"
                            />
                        </a>
                        <h2>Floating Box</h2>
                        <p className="spec">
                            3 detached villas · 4 bedrooms · G+1 + roof · 231 to 282 m²
                        </p>
                        <p className="d">
                            White first-floor boxes hover over dark stone and
                            frameless glass. Every villa has its own roof terrace
                            and pool.
                        </p>
                        <a className="open" href="/3d/floating-box.html" target="_blank">
                            Open the 3D model →
                        </a>
                    </article>

                    <article className="card">
                        <a
                            className="pic"
                            href="/3d/townhouses.html"
                            aria-label="Open the East Airport Townhouses 3D model"
                        >
                            <img
                                src="/3d/img/townhouses.jpg"
                                alt="East Airport Townhouses, 3D design concept"
                                width="1200"
                                height="750"
                            />
                        </a>
                        <h2>East Airport Townhouses</h2>
                        <p className="spec">
                            4 townhouses · 4 bedrooms · 186 m² each · 2 covered cars
                        </p>
                        <p className="d">
                            A gated mews of four townhouses with teak-finish fins
                            shading the glass and solar panels hidden behind
                            the parapet.
                        </p>
                        <a className="open" href="/3d/townhouses.html" target="_blank">
                            Open the 3D model →
                        </a>
                    </article>
                </main>

                <section className="band">
                    <div className="in">
                        <div>
                            <h3>We design it</h3>
                            <p>
                                Our architects, interior designers and civil,
                                electrical and mechanical engineers work under one roof.
                            </p>
                        </div>
                        <div>
                            <h3>We build it</h3>
                            <p>
                                Our own site team builds from our own drawings,
                                so the house you approve is the house you get.
                            </p>
                        </div>
                        <div>
                            <h3>We finish it</h3>
                            <p>
                                Tiles, kitchens, wardrobes, lighting and air
                                conditioning. You receive the keys to a finished home.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="contact">
                    <div className="in">
                        <div>
                            <h2>Planning a home or a development in Accra?</h2>
                            <p>
                                Send us your plot and your brief. We will come back
                                with a design and a clear price. Call or WhatsApp{" "}
                                <span className="phone">+233 59 639 9006</span>
                            </p>
                        </div>
                        <div className="actions">
                            <a
                                className="btn gold"
                                href="https://wa.me/233596399006?text=Hello%20Handasiyan%2C%20I%20saw%20your%203D%20designs%20and%20I%20would%20like%20to%20talk%20about%20a%20project."
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                WhatsApp us
                            </a>
                            <a
                                className="btn"
                                href="https://handasiyan.com"
                                target="_top"
                            >
                                Visit handasiyan.com
                            </a>
                        </div>
                    </div>
                </section>
            </div>


        </>
    );
}
