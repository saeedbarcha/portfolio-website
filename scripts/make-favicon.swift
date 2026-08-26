import AppKit
import Foundation

let root = URL(fileURLWithPath: CommandLine.arguments.count > 1
  ? CommandLine.arguments[1]
  : FileManager.default.currentDirectoryPath)
let portraitURL = root.appendingPathComponent("public/portrait.jpg")
let publicDir = root.appendingPathComponent("public")

guard let source = NSImage(contentsOf: portraitURL) else {
  fputs("Could not load portrait.jpg\n", stderr)
  exit(1)
}

let srcW = source.size.width
let srcH = source.size.height
let crop = min(srcW, srcH) * 0.68
let cropRect = NSRect(
  x: (srcW - crop) / 2,
  y: srcH - crop - srcH * 0.04,
  width: crop,
  height: crop
)

func render(size: CGFloat, cornerRatio: CGFloat, strokeRatio: CGFloat) -> NSBitmapImageRep {
  let scale: CGFloat = 2
  let px = Int(size * scale)
  guard let rep = NSBitmapImageRep(
    bitmapDataPlanes: nil,
    pixelsWide: px,
    pixelsHigh: px,
    bitsPerSample: 8,
    samplesPerPixel: 4,
    hasAlpha: true,
    isPlanar: false,
    colorSpaceName: .deviceRGB,
    bytesPerRow: 0,
    bitsPerPixel: 0
  ) else {
    fputs("Could not create bitmap\n", stderr)
    exit(1)
  }
  rep.size = NSSize(width: size, height: size)

  NSGraphicsContext.saveGraphicsState()
  guard let context = NSGraphicsContext(bitmapImageRep: rep) else {
    fputs("Could not create graphics context\n", stderr)
    exit(1)
  }
  NSGraphicsContext.current = context
  context.imageInterpolation = .high
  context.shouldAntialias = true

  let rect = NSRect(x: 0, y: 0, width: size, height: size)
  NSColor(srgbRed: 9 / 255, green: 9 / 255, blue: 11 / 255, alpha: 1).setFill()
  rect.fill()

  let inset = max(size * 0.06, 0.75)
  let inner = rect.insetBy(dx: inset, dy: inset)
  let corner = inner.width * cornerRatio
  let clip = NSBezierPath(roundedRect: inner, xRadius: corner, yRadius: corner)
  clip.addClip()
  source.draw(in: inner, from: cropRect, operation: .copy, fraction: 1)

  NSGraphicsContext.restoreGraphicsState()
  NSGraphicsContext.saveGraphicsState()
  NSGraphicsContext.current = context

  let gold = NSColor(srgbRed: 201 / 255, green: 160 / 255, blue: 108 / 255, alpha: 1)
  gold.setStroke()
  let ring = NSBezierPath(roundedRect: inner, xRadius: corner, yRadius: corner)
  ring.lineWidth = max(size * strokeRatio, 0.8)
  ring.stroke()

  NSGraphicsContext.restoreGraphicsState()
  return rep
}

func writePng(_ rep: NSBitmapImageRep, name: String) {
  guard let data = rep.representation(using: .png, properties: [:]) else {
    fputs("Could not encode \(name)\n", stderr)
    exit(1)
  }
  let url = publicDir.appendingPathComponent(name)
  try! data.write(to: url)
  print("wrote \(url.path)")
}

let outputs: [(CGFloat, String)] = [
  (16, "favicon-16x16.png"),
  (32, "favicon-32x32.png"),
  (48, "favicon-48x48.png"),
  (180, "apple-touch-icon.png"),
  (192, "android-chrome-192x192.png"),
  (512, "android-chrome-512x512.png"),
]

for (size, name) in outputs {
  let corner = size <= 32 ? 0.22 : 0.2
  let stroke = size <= 32 ? 0.07 : 0.035
  writePng(render(size: size, cornerRatio: corner, strokeRatio: stroke), name: name)
}
