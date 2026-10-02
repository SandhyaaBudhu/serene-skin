# Photography provenance

Both original assets were created using the built-in imagegen tool, then copied into this project. They do not rely on external image services at runtime.

## Products — `public/images/products.png`

Prompt: Use case: product-mockup. Create a premium skincare product photography contact sheet for fictional brand 'serene skin'. Image is a precise 2x2 grid of four equally sized square photographs, edge-to-edge with NO gutters or panel borders. All four backgrounds are exactly the same warm pale ivory plaster with natural light, soft cast shadows, tactile packaging and refined editorial beauty photography. TOP LEFT: a tall creamy ivory cylindrical cleanser pump bottle with soft sage green pump and restrained tiny dark serif label 'serene skin' and 'Soft Start' and 'gentle cleanser'. TOP RIGHT: muted sage green matte glass serum bottle with ivory dropper, tiny serif label 'serene skin' and 'Daily Dew' and 'hydrating serum'. BOTTOM LEFT: squat wide ivory cream jar with sage lid, label 'serene skin' and 'Cloud Comfort' and 'daily moisturiser'. BOTTOM RIGHT: squat wide muted peach overnight mask jar with creamy ivory lid, tiny label 'serene skin' and 'Moon Rest'. Each product is perfectly centered within its own quadrant with generous surrounding space, photographed straight on, packaging upright on a pale ivory surface, no props, product fills 60 percent of its quadrant height, preserve all shadows within each panel. Photorealistic high-end beauty still life, soft afternoon daylight, coherent true product catalog. No text outside labels, no badges, no watermark.

## Hero — `public/images/hero.png`

Prompt: Use case: product-mockup. Wide landscape luxury beauty editorial photograph for the original fictional skincare brand serene skin. Four tactile skincare packages in muted sage and warm ivory: tall cream cleanser pump bottle with sage pump, sage glass dropper serum bottle, low cream moisturiser jar with sage lid, peach mask jar with ivory lid. Tiny refined serif text 'serene skin' on each. Beautiful composition of products placed at varied heights on softly rounded light cream limestone plinths in lower right and center of image. Long sunlit shadows, background entirely sage green softly textured plaster. Loose graceful eucalyptus branch entering from upper right, soft leaf shadows on backdrop, a pale natural stone in foreground, spa calm but strong art direction. Photo scene occupies entire image, no overlaid graphic text, no UI, no watermark. Warm diffused side light, photoreal tactile frosted glass and ceramic packaging, refined editorial high-end skincare campaign, restrained natural color, artistic slightly elevated camera view. Wide 3:2 landscape composition.

Supporting editorial and botanical photographs are saved locally as optimized WebP files, with gradient fallback components for unavailable images. Source URLs:

- Botanical: https://images.unsplash.com/photo-1518495973542-4542c06a5843
- Journal ritual: https://images.unsplash.com/photo-1608571423902-eed4a5ad8108
- Journal evening: https://images.unsplash.com/photo-1540555700478-4be289fbecef
- Journal texture: https://images.unsplash.com/photo-1497250681960-ef046c08a56e

DM Sans (weights 400–700) and DM Serif Display (regular and italic) are stored locally in `public/fonts`, with their SIL Open Font Licenses. Fonts were retrieved from Google Fonts.

## Final hero refinement — `public/images/hero-refined.png`

The built-in imagegen tool edited only the package descriptors to match the product catalogue. The app uses `public/images/hero-refined.webp`.

Prompt: Use case: precise-object-edit. Preserve this beauty product photograph EXACTLY: same landscape composition, all four packages in same shapes, colours, positions, sizes, same limestone plinths, sage backdrop, eucalyptus, natural light, shadows and camera framing. Change ONLY the tiny printed labels below the already correct 'serene skin' brand name on the four product containers. Tall ivory pump bottle: 'Soft Start' on first line, 'gentle cleanser' on second. Sage glass dropper bottle: 'Daily Dew' on first line, 'hydrating serum' on second. Ivory jar with sage lid in front: 'Cloud Comfort' on first line, 'daily moisturiser' on second. Peach jar with ivory lid at right: 'Moon Rest' on first line, 'overnight mask' on second. Use small refined dark serif type, same modest size as the current descriptors. Remove other old descriptive text from each label. No other visual changes, no badges or graphics. Keep brand name serene skin on all four labels.
