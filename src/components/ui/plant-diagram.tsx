/**
 * Esquema unifilar de una planta híbrida, dibujado en SVG inline.
 *
 * Sustituye a la foto de la sección de Servicios: arreglo FV, almacenamiento y
 * grupo de respaldo entrando a una barra común, tablero, y de ahí a las cargas
 * y al punto de conexión con la red. Se muestra completo, sin estados: lo único
 * que se mueve es el punteado de la corriente sobre los conductores.
 */

export function PlantDiagram() {
    return (
        <figure className="plant-diagram">
            <figcaption className="plant-diagram-head">
                <span className="plant-diagram-eyebrow">Esquema unifilar</span>
                <span className="plant-diagram-title">Planta híbrida solar · BESS · respaldo</span>
            </figcaption>

            <svg
                className="plant-diagram-svg"
                viewBox="0 0 520 420"
                role="img"
                aria-label="Esquema unifilar de una planta híbrida: arreglo fotovoltaico, almacenamiento y grupo electrógeno sobre una barra común, tablero general, punto de conexión a la red y cargas."
            >
                {/* ── Expediente: marco acotado y anotaciones de plano ───────── */}
                <g>
                    <rect
                        className="dg-sheet-frame"
                        x="10"
                        y="12"
                        width="500"
                        height="396"
                        rx="10"
                    />
                    <path className="dg-dim" d="M30 396h228M30 391v10M258 391v10" />
                    <text className="dg-annot" x="144" y="386" textAnchor="middle">GENERACIÓN</text>
                    <path className="dg-dim" d="M300 396h188M300 391v10M488 391v10" />
                    <text className="dg-annot" x="394" y="386" textAnchor="middle">ENTREGA</text>
                    <text className="dg-annot" x="153" y="52" textAnchor="middle">CC</text>
                    <text className="dg-annot" x="244" y="52" textAnchor="middle">CA</text>
                    <text className="dg-annot" x="266" y="256">3F + N</text>
                </g>

                {/* ── Conductores y barra común ──────────────────────────────── */}
                <g>
                    <path className="dg-line" d="M142 65h116M142 197h116M142 329h116" />
                    <path className="dg-line" d="M258 197h42" />
                    <path className="dg-bus" d="M258 65v264" />
                    <path className="dg-flow" d="M142 65h116M142 197h116M142 329h116M258 197h42" />
                </g>

                {/* ── Equipos: fuentes ───────────────────────────────────────── */}
                <g>
                    <rect className="dg-box" x="24" y="38" width="118" height="54" rx="12" />
                    <path className="dg-glyph" d="M52 74l10-22h26l-10 22zM56 65h26M62 52v22" />
                    <text className="dg-label" x="112" y="70" textAnchor="middle">FV</text>
                    {/* Inversor CC/CA sobre la línea del arreglo. */}
                    <path
                        className="dg-invert"
                        d="M164 51h34v28h-34zM164 79l34-28M170 74c3-6 6-6 9 0M179 74c3 6 6 6 9 0"
                    />
                    <text className="dg-sub" x="83" y="108" textAnchor="middle">Arreglo solar</text>

                    <rect className="dg-box" x="24" y="170" width="118" height="54" rx="12" />
                    <path className="dg-glyph" d="M52 186h30v22H52zM82 192h5v10h-5M58 192v10M66 192v10M74 192v10" />
                    <text className="dg-label" x="112" y="202" textAnchor="middle">BESS</text>
                    <text className="dg-sub" x="83" y="240" textAnchor="middle">Almacenamiento</text>

                    <rect className="dg-box" x="24" y="302" width="118" height="54" rx="12" />
                    <circle className="dg-glyph" cx="64" cy="329" r="13" />
                    <text className="dg-glyph-text" x="64" y="334" textAnchor="middle">G</text>
                    <text className="dg-label" x="112" y="334" textAnchor="middle">GRUPO</text>
                    <text className="dg-sub" x="83" y="372" textAnchor="middle">Respaldo</text>
                </g>

                {/* ── Protecciones y maniobra ────────────────────────────────── */}
                <g>
                    <rect className="dg-breaker" x="214" y="58" width="15" height="15" rx="2" />
                    <rect className="dg-breaker" x="214" y="190" width="15" height="15" rx="2" />
                    <rect className="dg-breaker" x="214" y="322" width="15" height="15" rx="2" />
                    <text className="dg-annot dg-annot-strong" x="198" y="290" textAnchor="middle">
                        CNE · NTP-IEC
                    </text>
                </g>

                {/* ── Tablero general ────────────────────────────────────────── */}
                <g>
                    <rect className="dg-box" x="300" y="170" width="126" height="54" rx="12" />
                    <path className="dg-glyph" d="M322 184h20v26h-20zM326 190h12M326 197h12M326 204h6" />
                    <text className="dg-label" x="386" y="202" textAnchor="middle">TABLERO</text>
                    <text className="dg-sub" x="363" y="240" textAnchor="middle">Punto común</text>
                </g>

                {/* ── Monitoreo / O&M ────────────────────────────────────────── */}
                <g>
                    <path className="dg-dashed" d="M367 128v42" />
                    <circle className="dg-node" cx="367" cy="110" r="18" />
                    <path
                        className="dg-glyph"
                        d="M360 114c4-5 10-5 14 0M363 108c2.5-3 8-3 10.5 0M367 118h.5"
                    />
                    <text className="dg-sub" x="367" y="80" textAnchor="middle">Monitoreo O&amp;M</text>
                </g>

                {/* ── Punto de conexión con la red ───────────────────────────── */}
                <g>
                    <path className="dg-line" d="M426 197h40M466 197V87" />
                    <circle className="dg-node" cx="466" cy="65" r="22" />
                    <path className="dg-glyph" d="M454 65c4-7 8-7 12 0s8 7 12 0" />
                    <text className="dg-sub" x="466" y="32" textAnchor="middle">Red</text>
                </g>

                {/* ── Cargas ─────────────────────────────────────────────────── */}
                <g>
                    <path className="dg-line" d="M426 197h40M466 197v120" />
                    <circle className="dg-node" cx="466" cy="329" r="22" />
                    <path className="dg-glyph" d="M466 320v15M459 329l7 7 7-7" />
                    <text className="dg-sub" x="466" y="368" textAnchor="middle">Cargas</text>
                </g>
            </svg>

        </figure>
    )
}
