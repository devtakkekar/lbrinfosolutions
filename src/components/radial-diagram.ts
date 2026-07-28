/**
 * Radial Feature Diagram Component (homepage hero decoration)
 *
 * Computes SVG connector-line endpoints and arc-bracket paths from simple
 * data-* attributes on the markup, so the diagram's geometry can be tuned
 * by editing HTML attributes alone — no trig required, no hand-edited
 * path "d" strings. Ported 1:1 from the original standalone demo; only
 * the DOM scope (querying within #stage instead of the whole document)
 * and TypeScript types were added.
 *
 *   Connector lines (<line class="connector">):
 *     data-angle  = direction from the fixed start point, degrees (0=right, 90=up)
 *     data-length = how far the line reaches, in px
 *
 *   Arc brackets (<path class="arc-bracket">):
 *     data-angle  = center angle of the bracket, degrees (0=right, 90=up) —
 *                   keep matched to the connector line's data-angle
 *     data-radius = distance from the hub center (lower = closer to the hub)
 *     data-width  = half-angle in degrees (higher = more circumference covered)
 */

const HUB_CX = 330;
const HUB_CY = 330;

function arcPoint(radius: number, angleDeg: number): [number, number] {
  const rad = (angleDeg * Math.PI) / 180;
  return [HUB_CX + radius * Math.cos(rad), HUB_CY - radius * Math.sin(rad)];
}

export function initRadialDiagram(): void {
  const stage = document.getElementById('stage');
  if (!stage) return;

  stage.querySelectorAll<SVGLineElement>('.connector').forEach((line) => {
    const angle = Number(line.dataset.angle ?? 0);
    const len = Number(line.dataset.length ?? 0);
    const x1 = Number(line.getAttribute('x1') ?? 0);
    const y1 = Number(line.getAttribute('y1') ?? 0);
    const rad = (angle * Math.PI) / 180;
    const x2 = x1 + len * Math.cos(rad);
    const y2 = y1 - len * Math.sin(rad);
    line.setAttribute('x2', x2.toFixed(1));
    line.setAttribute('y2', y2.toFixed(1));
  });

  stage.querySelectorAll<SVGPathElement>('.arc-bracket').forEach((path) => {
    const angle = Number(path.dataset.angle ?? 0);
    const radius = Number(path.dataset.radius ?? 0);
    const halfWidth = Number(path.dataset.width ?? 0);
    // Large-arc-flag must flip to 1 if the total span (2 * halfWidth) exceeds 180°
    const largeArcFlag = halfWidth * 2 > 180 ? 1 : 0;
    const [x0, y0] = arcPoint(radius, angle - halfWidth);
    const [x1, y1] = arcPoint(radius, angle + halfWidth);
    path.setAttribute(
      'd',
      `M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${x1.toFixed(1)} ${y1.toFixed(1)}`
    );
  });

  // Every connector/arc now has its real coordinates — safe to reveal.
  // (See the paired opacity:0 default in radial-diagram.css.)
  stage.classList.add('is-ready');
}
