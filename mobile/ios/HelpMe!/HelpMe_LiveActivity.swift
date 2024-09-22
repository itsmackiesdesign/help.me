import ActivityKit
import WidgetKit
import SwiftUI

struct HelpMe_Attributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        var emoji: String
    }

    var name: String
}

struct HelpMe_LiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: HelpMe_Attributes.self) { context in
            ZStack {
                Color.white
                    .edgesIgnoringSafeArea(.all)

                VStack {
                    Spacer()
                    
                    Button(action: {
                    }) {
                        Text("SOS")
                            .font(.system(size: 50, weight: .bold))
                            .foregroundColor(.white)
                            .frame(width: 150, height: 150)
                            .background(Color.red)
                            .cornerRadius(75)
                    }
                    
                    Spacer()
                }
            }
            .activityBackgroundTint(Color.cyan)
            .activitySystemActionForegroundColor(Color.white)

        } dynamicIsland: { context in
            DynamicIsland {
                DynamicIslandExpandedRegion(.center) {
                    Button(action: {
                    }) {
                        Text("SOS")
                            .font(.system(size: 40, weight: .bold))
                            .foregroundColor(.white)
                            .frame(width: 100, height: 100)
                            .background(Color.red)
                            .cornerRadius(50) // Круглая кнопка
                    }
                }
            } compactLeading: {
                Text("L")
            } compactTrailing: {
                Text("T \(context.state.emoji)")
            } minimal: {
                Text(context.state.emoji)
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}

extension HelpMe_Attributes {
    fileprivate static var preview: HelpMe_Attributes {
        HelpMe_Attributes(name: "World")
    }
}

extension HelpMe_Attributes.ContentState {
    fileprivate static var smiley: HelpMe_Attributes.ContentState {
        HelpMe_Attributes.ContentState(emoji: "😀")
    }
    
    fileprivate static var starEyes: HelpMe_Attributes.ContentState {
        HelpMe_Attributes.ContentState(emoji: "🤩")
    }
}

#Preview("Notification", as: .content, using: HelpMe_Attributes.preview) {
   HelpMe_LiveActivity()
} contentStates: {
    HelpMe_Attributes.ContentState.smiley
    HelpMe_Attributes.ContentState.starEyes
}
