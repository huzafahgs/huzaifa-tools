// Repository-authored editorial content; no visitor HTML is accepted.
export default `A conversion changes the unit used to describe a quantity. It does not turn one kind of quantity into another. Metres can become feet, but metres cannot become kilograms without an entirely different physical relationship and additional information.

The [Unit Converter](/unit-converter) groups length, weight and volume options by measurement category. After you choose a source unit, the destination menu is limited to compatible units so a length cannot be converted into a mass or volume by mistake.

## Start with the dimension, then the unit

For a measured length of 2 metres, choose meter as From and centimeter as To. The result is 200 centimetres. The number grows because the destination unit is smaller, while the physical length stays the same.

For mass or volume, choose the source unit from the appropriate group. The destination menu then shows only units from that group. Converting a volume into mass still requires density and context, which this interface does not provide.

## Use the interface with a compatibility check

1. Identify whether the quantity is length, mass or volume.
2. Enter the measured number without changing its original unit.
3. Select the source unit; the destination menu updates to its category.
4. Choose a compatible destination and run Convert.
5. Check the direction of the magnitude change and keep the unit attached.

The implementation uses fixed factor ratios and displays six decimal places. Some stored factors are rounded. Those digits therefore do not promise six-decimal physical accuracy or a metrology-grade result.

## Prefer a focused converter when the category is known

[Length Converter](/length-converter), [Weight Converter](/weight-converter) and [Volume Converter](/volume-converter) keep their menus within a single measurement type and include some additional category-specific options. They also make the intended dimension clearer to a reader checking your work.

The general page is useful for switching between a few ordinary same-category tasks. It does not replace specialised conversion rules such as temperature offsets, squared area factors or currency quotations.

## Names can hide different conventions

A gallon, cup or ton can have different definitions in different contexts. The tool's fixed factors correspond to particular conventions, not every regional usage of a label. Consult the dedicated guide and the source measurement's definition before using an ambiguous unit.

The [BIPM SI reference](https://www.bipm.org/en/publications/si-brochure) provides authoritative context for physical quantities and units. A lookup table in a small utility should not be treated as a universal interpretation of every measurement label.

## Accuracy begins with the source

Converting a rough estimate to six decimals does not improve the measurement. Preserve appropriate significant figures, avoid repeatedly converting rounded outputs and use a verified standard for safety-critical or contractual work.

The arithmetic is performed in the browser without accessing a sensor or measurement service. See the [Privacy Policy](/privacy-policy) for site context. Open the [Unit Converter](/unit-converter) after identifying the source dimension and report the result with its units.
`;
