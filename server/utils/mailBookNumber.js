export function buildMailBookNumber(
    direction,
    sequence,
    year,
    version = null
) {
    const ruDirection = direction === "IN"
        ? "ВХ"
        : "ИСХ";

    const base = `${ruDirection}-${sequence}/${year}`;

    return version ? `${base}/${version}` : base;
}