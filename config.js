import { @Vigilant, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, Color } from 'Vigilance';
import { countData } from './presistentData';
let currentVersion = JSON.parse(FileLib.read("FragRunHelper", "metadata.json")).version 
var moveDisplay = new Gui();



@Vigilant("FragRunHelper")
class Settings {
    @SwitchProperty({
        name: "§aGiant Notification",
        description: "Get Notified when a Giant spawns in F7 Blood Room",
        category: "General",
        subcategory: "Notification"
    })
    NotificationBoolean = true;
    @SwitchProperty({
        name: "§aFragrun Information",
        description: "Displays a list of the Giants on the screen",
        category: "General",
        subcategory: "Display"
    })
    FragrunInfoBoolean = false;
    @ButtonProperty({
        name: "§aEdit location",
        description: "Place the display where you like",
        category: "General",
        subcategory: "Display"
    })
    moveFragrunDisplay() {
        moveDisplay.open()
    }
    @ButtonProperty({
        name: "§aClear content",
        description: "Clear the saved data to reset",
        category: "General",
        subcategory: "Display"
    })
    clearContent(){
        countData.diamanteCount = 0;
        countData.lasrCount = 0;
        countData.bigfootCount = 0;
        countData.jollypinkCount = 0;
        countData.save();
        const EssentialAPI = Java.type("gg.essential.api.EssentialAPI")
        EssentialAPI.getNotifications().push("Counters Reset!", "", 3)
    }
    constructor() {
        this.initialize(this)
        this.setCategoryDescription("General", 
        "&aFragRunHelper " + currentVersion + "\n" + 
        "&7Made by EnderGamer#9495"
    )
    }
}
export { countData };