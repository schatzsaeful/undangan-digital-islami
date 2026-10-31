import Foundation
import Vision
import CoreImage
import AppKit

func processImage(inputPath: String, outputPath: String) {
    print("Processing \(inputPath)...")
    guard let nsImg = NSImage(contentsOfFile: inputPath),
          let cgImg = nsImg.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
        print("Failed to load \(inputPath)")
        return
    }
    
    let request = VNGenerateForegroundInstanceMaskRequest()
    let handler = VNImageRequestHandler(cgImage: cgImg, options: [:])
    do {
        try handler.perform([request])
    } catch {
        print("Vision error: \(error)")
        return
    }
    
    guard let result = request.results?.first else {
        print("No foreground mask found for \(inputPath)")
        return
    }
    
    do {
        let maskPixelBuffer = try result.generateMaskedImage(
            ofInstances: result.allInstances,
            from: handler,
            croppedToInstancesExtent: false
        )
        let ciImage = CIImage(cvPixelBuffer: maskPixelBuffer)
        let context = CIContext()
        guard let outputCGImage = context.createCGImage(ciImage, from: ciImage.extent) else {
            print("Failed to create CGImage")
            return
        }
        let rep = NSBitmapImageRep(cgImage: outputCGImage)
        guard let pngData = rep.representation(using: .png, properties: [:]) else {
            print("Failed to create PNG data")
            return
        }
        try pngData.write(to: URL(fileURLWithPath: outputPath))
        print("Successfully written to \(outputPath) (\(pngData.count) bytes)")
    } catch {
        print("Error during mask generation: \(error)")
    }
}

let groomInput = "/Users/saefulhusna/.gemini/antigravity/brain/88ff8923-47ce-4b04-bbd3-5210e7762c8c/.user_uploaded/media_1793408770807_1badd041.jpg"
let brideInput = "/Users/saefulhusna/.gemini/antigravity/brain/88ff8923-47ce-4b04-bbd3-5210e7762c8c/.user_uploaded/media_1793408770817_8fa16eba.jpg"

let groomOutput = "/Users/saefulhusna/Documents/Project/Website/Undangan/public/images/groom.png"
let brideOutput = "/Users/saefulhusna/Documents/Project/Website/Undangan/public/images/bride.png"

processImage(inputPath: groomInput, outputPath: groomOutput)
processImage(inputPath: brideInput, outputPath: brideOutput)

