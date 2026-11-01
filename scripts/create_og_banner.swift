import Foundation
import AppKit
import CoreGraphics
import CoreText

let width: CGFloat = 1200
let height: CGFloat = 630

let colorSpace = CGColorSpaceCreateDeviceRGB()
guard let context = CGContext(
    data: nil,
    width: Int(width),
    height: Int(height),
    bitsPerComponent: 8,
    bytesPerRow: 0,
    space: colorSpace,
    bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
) else {
    fatalError("Failed to create CGContext")
}

// 1. Draw Emerald Background Gradient
let backgroundColors = [
    NSColor(red: 0.086, green: 0.220, blue: 0.196, alpha: 1.0).cgColor, // #163832
    NSColor(red: 0.043, green: 0.169, blue: 0.149, alpha: 1.0).cgColor, // #0B2B26
    NSColor(red: 0.024, green: 0.090, blue: 0.075, alpha: 1.0).cgColor  // #061713
] as CFArray

guard let bgGradient = CGGradient(colorsSpace: colorSpace, colors: backgroundColors, locations: [0.0, 0.6, 1.0]) else {
    fatalError("Failed to create background gradient")
}

context.drawRadialGradient(
    bgGradient,
    startCenter: CGPoint(x: width * 0.7, y: height * 0.4),
    startRadius: 50,
    endCenter: CGPoint(x: width * 0.5, y: height * 0.5),
    endRadius: 750,
    options: [.drawsBeforeStartLocation, .drawsAfterEndLocation]
)

// 2. Ornate Gold Double Border
context.saveGState()
let outerRect = CGRect(x: 20, y: 20, width: width - 40, height: height - 40)
let outerPath = CGPath(roundedRect: outerRect, cornerWidth: 28, cornerHeight: 28, transform: nil)
context.setStrokeColor(NSColor(red: 0.835, green: 0.643, blue: 0.220, alpha: 0.5).cgColor) // #D5A438
context.setLineWidth(2.5)
context.addPath(outerPath)
context.strokePath()

let innerRect = CGRect(x: 27, y: 27, width: width - 54, height: height - 54)
let innerPath = CGPath(roundedRect: innerRect, cornerWidth: 22, cornerHeight: 22, transform: nil)
context.setStrokeColor(NSColor(red: 0.835, green: 0.643, blue: 0.220, alpha: 0.25).cgColor)
context.setLineWidth(1.0)
context.addPath(innerPath)
context.strokePath()
context.restoreGState()

// 3. Left Arch Frame with Syar'i Couple Illustration
let archX: CGFloat = 70
let archY: CGFloat = 75
let archW: CGFloat = 370
let archH: CGFloat = 480
let archRadius: CGFloat = archW / 2.0 // 185

let coupleImgPath = "public/images/couple.jpg"
if let coupleNSImage = NSImage(contentsOfFile: coupleImgPath),
   let cgImage = coupleNSImage.cgImage(forProposedRect: nil, context: nil, hints: nil) {
    
    context.saveGState()
    
    // Create Arch Path (rounded top, slightly rounded bottom)
    let archPath = CGMutablePath()
    let bottomRadius: CGFloat = 20.0
    
    // Bottom-left
    archPath.move(to: CGPoint(x: archX + bottomRadius, y: archY))
    // Bottom edge to bottom-right
    archPath.addLine(to: CGPoint(x: archX + archW - bottomRadius, y: archY))
    archPath.addArc(tangent1End: CGPoint(x: archX + archW, y: archY),
                    tangent2End: CGPoint(x: archX + archW, y: archY + bottomRadius),
                    radius: bottomRadius)
    // Right edge up to straight section before top arch
    archPath.addLine(to: CGPoint(x: archX + archW, y: archY + archH - archRadius))
    // Top Arch semicircle
    archPath.addArc(center: CGPoint(x: archX + archRadius, y: archY + archH - archRadius),
                    radius: archRadius,
                    startAngle: 0,
                    endAngle: CGFloat.pi,
                    clockwise: false)
    // Left edge down
    archPath.addLine(to: CGPoint(x: archX, y: archY + bottomRadius))
    archPath.addArc(tangent1End: CGPoint(x: archX, y: archY),
                    tangent2End: CGPoint(x: archX + bottomRadius, y: archY),
                    radius: bottomRadius)
    archPath.closeSubpath()
    
    // Draw gold shadow under arch
    context.setShadow(offset: CGSize(width: 0, height: -12), blur: 30, color: NSColor.black.withAlphaComponent(0.6).cgColor)
    context.setFillColor(NSColor(red: 0.086, green: 0.220, blue: 0.196, alpha: 1.0).cgColor)
    context.addPath(archPath)
    context.fillPath()
    context.setShadow(offset: .zero, blur: 0, color: nil)
    
    // Clip image inside arch
    context.saveGState()
    context.addPath(archPath)
    context.clip()
    
    // Draw couple image maintaining aspect ratio
    // Original image is 853x842. We scale and position to center faces and bouquet.
    let imgDrawRect = CGRect(x: archX - 55, y: archY - 10, width: archW + 110, height: archH + 60)
    context.draw(cgImage, in: imgDrawRect)
    context.restoreGState()
    
    // Draw Gold Frame Border around Arch
    let borderColors = [
        NSColor(red: 0.925, green: 0.812, blue: 0.557, alpha: 1.0).cgColor, // #ECCF8E
        NSColor(red: 0.773, green: 0.576, blue: 0.145, alpha: 1.0).cgColor, // #C59325
        NSColor(red: 0.557, green: 0.714, blue: 0.608, alpha: 0.5).cgColor  // #8EB69B
    ] as CFArray
    if let strokeGrad = CGGradient(colorsSpace: colorSpace, colors: borderColors, locations: [0.0, 0.7, 1.0]) {
        context.saveGState()
        context.addPath(archPath)
        context.setLineWidth(5.0)
        context.replacePathWithStrokedPath()
        context.clip()
        context.drawLinearGradient(strokeGrad, start: CGPoint(x: archX, y: archY + archH), end: CGPoint(x: archX, y: archY), options: [])
        context.restoreGState()
    }
    
    context.restoreGState()
}

// Helper for drawing CoreText
func drawText(_ str: String, font: NSFont, color: NSColor, at point: CGPoint, tracking: Double = 0) {
    var attrs: [NSAttributedString.Key: Any] = [
        .font: font,
        .foregroundColor: color
    ]
    if tracking != 0 {
        attrs[.kern] = tracking
    }
    let attrStr = NSAttributedString(string: str, attributes: attrs)
    let line = CTLineCreateWithAttributedString(attrStr)
    context.textPosition = point
    CTLineDraw(line, context)
}

// 4. Right Side Typography
// Note: CoreGraphics coordinate system has (0,0) at bottom-left!
// height = 630. Y values go from 0 (bottom) to 630 (top).

let textStartX: CGFloat = 490

// A. Royal Badge at Top
let badgeY: CGFloat = 530
let badgeRect = CGRect(x: textStartX, y: badgeY - 5, width: 270, height: 28)
let badgePath = CGPath(roundedRect: badgeRect, cornerWidth: 14, cornerHeight: 14, transform: nil)
context.setFillColor(NSColor(red: 0.773, green: 0.576, blue: 0.145, alpha: 0.22).cgColor)
context.addPath(badgePath)
context.fillPath()
context.setStrokeColor(NSColor(red: 0.835, green: 0.643, blue: 0.220, alpha: 0.6).cgColor)
context.setLineWidth(1.2)
context.addPath(badgePath)
context.strokePath()

let badgeFont = NSFont.systemFont(ofSize: 11, weight: .bold)
drawText("✦  WALIMATUL 'URS SYAR'I  ✦", font: badgeFont, color: NSColor(red: 0.925, green: 0.812, blue: 0.557, alpha: 1.0), at: CGPoint(x: textStartX + 20, y: badgeY + 4), tracking: 2.0)

// B. Arabic Calligraphy
let arabicFont = NSFont(name: "Amiri", size: 22) ?? NSFont(name: "Georgia", size: 20) ?? NSFont.systemFont(ofSize: 20, weight: .medium)
drawText("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", font: arabicFont, color: NSColor(red: 0.882, green: 0.722, blue: 0.365, alpha: 1.0), at: CGPoint(x: textStartX, y: 490), tracking: 2.0)

// C. Undangan Pernikahan Subtitle
let subFont = NSFont.systemFont(ofSize: 12, weight: .semibold)
drawText("UNDANGAN PERNIKAHAN SUCI", font: subFont, color: NSColor(red: 0.925, green: 0.812, blue: 0.557, alpha: 0.8), at: CGPoint(x: textStartX, y: 462), tracking: 3.5)

// D. Couple Names (Heri & Asri)
let nameFont = NSFont(name: "Playfair Display", size: 60) ?? NSFont(name: "Georgia-Bold", size: 58) ?? NSFont.boldSystemFont(ofSize: 58)
let andFont = NSFont(name: "Georgia-Italic", size: 44) ?? NSFont.systemFont(ofSize: 44)

drawText("Heri", font: nameFont, color: NSColor(red: 0.965, green: 0.937, blue: 0.812, alpha: 1.0), at: CGPoint(x: textStartX, y: 395))
drawText("&", font: andFont, color: NSColor(red: 0.835, green: 0.643, blue: 0.220, alpha: 0.9), at: CGPoint(x: textStartX + 140, y: 395))
drawText("Asri", font: nameFont, color: NSColor(red: 0.965, green: 0.937, blue: 0.812, alpha: 1.0), at: CGPoint(x: textStartX + 195, y: 395))

// E. Full Formal Names
let fullNamesFont = NSFont.systemFont(ofSize: 16, weight: .medium)
drawText("Heri Rahmat Susanto  &  Asri Agustini", font: fullNamesFont, color: NSColor(red: 0.855, green: 0.945, blue: 0.871, alpha: 0.95), at: CGPoint(x: textStartX, y: 360))

// F. Gold Divider Line
context.saveGState()
let dividerColors = [
    NSColor(red: 0.835, green: 0.643, blue: 0.220, alpha: 0.8).cgColor,
    NSColor(red: 0.835, green: 0.643, blue: 0.220, alpha: 0.05).cgColor
] as CFArray
if let divGrad = CGGradient(colorsSpace: colorSpace, colors: dividerColors, locations: [0.0, 1.0]) {
    context.saveGState()
    context.addRect(CGRect(x: textStartX, y: 338, width: 620, height: 1.5))
    context.clip()
    context.drawLinearGradient(divGrad, start: CGPoint(x: textStartX, y: 338), end: CGPoint(x: textStartX + 620, y: 338), options: [])
    context.restoreGState()
}
context.restoreGState()

// G. Date & Time
let detailFont = NSFont.systemFont(ofSize: 16, weight: .bold)
drawText("🗓️  Sabtu, 12 Desember 2026 • 08.00 WIB s/d Selesai", font: detailFont, color: NSColor(red: 0.925, green: 0.812, blue: 0.557, alpha: 1.0), at: CGPoint(x: textStartX, y: 295))

// H. Venue
let venueFont = NSFont.systemFont(ofSize: 14, weight: .regular)
drawText("📍  Masjid Agung Jawa Tengah, Semarang", font: venueFont, color: NSColor(red: 0.557, green: 0.714, blue: 0.608, alpha: 0.95), at: CGPoint(x: textStartX, y: 265))

// I. Syar'i Notice Pill
let noticeFont = NSFont.systemFont(ofSize: 12, weight: .medium)
drawText("✨  Konsep Syar'i • Pemisahan Majelis Ikhwan & Akhwat", font: noticeFont, color: NSColor(red: 0.855, green: 0.945, blue: 0.871, alpha: 0.8), at: CGPoint(x: textStartX, y: 235))

// J. Bottom CTA Button
let btnRect = CGRect(x: textStartX, y: 140, width: 280, height: 46)
let btnPath = CGPath(roundedRect: btnRect, cornerWidth: 23, cornerHeight: 23, transform: nil)

let btnColors = [
    NSColor(red: 0.925, green: 0.812, blue: 0.557, alpha: 1.0).cgColor, // #ECCF8E
    NSColor(red: 0.773, green: 0.576, blue: 0.145, alpha: 1.0).cgColor  // #C59325
] as CFArray

if let btnGrad = CGGradient(colorsSpace: colorSpace, colors: btnColors, locations: [0.0, 1.0]) {
    context.saveGState()
    context.setShadow(offset: CGSize(width: 0, height: -4), blur: 12, color: NSColor(red: 0.773, green: 0.576, blue: 0.145, alpha: 0.4).cgColor)
    context.addPath(btnPath)
    context.fillPath()
    context.restoreGState()
}

let btnFont = NSFont.systemFont(ofSize: 14, weight: .bold)
drawText("✉️   Buka Undangan Digital", font: btnFont, color: NSColor(red: 0.043, green: 0.169, blue: 0.149, alpha: 1.0), at: CGPoint(x: textStartX + 36, y: 156), tracking: 0.5)

// 5. Output image to file
guard let finalCGImage = context.makeImage() else {
    fatalError("Failed to make CGImage from context")
}

let nsFinal = NSImage(cgImage: finalCGImage, size: NSSize(width: width, height: height))
guard let tiffData = nsFinal.tiffRepresentation,
      let bitmapRep = NSBitmapImageRep(data: tiffData) else {
    fatalError("Failed to convert image to bitmap")
}

// Save high-quality JPG (compression 0.88, ~200-300KB ideal for WhatsApp)
if let jpgData = bitmapRep.representation(using: .jpeg, properties: [.compressionFactor: 0.88]) {
    let outURL = URL(fileURLWithPath: "public/images/og-banner.jpg")
    try! jpgData.write(to: outURL)
    print("Successfully generated public/images/og-banner.jpg (\(jpgData.count) bytes)")
}

// Also save PNG
if let pngData = bitmapRep.representation(using: .png, properties: [:]) {
    let outURL = URL(fileURLWithPath: "public/images/og-banner.png")
    try! pngData.write(to: outURL)
    print("Successfully generated public/images/og-banner.png (\(pngData.count) bytes)")
}

