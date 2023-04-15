import Settings from "./config";
import { Color } from "Vigilance";
import { countData } from './presistentData';
// to open the config gui use the "openGUI" function
register("command", () => openSettings()).setName("FragHelper");

function openSettings(){
	Settings.openGUI();
}

// to read/write config values, simply read/write them like normal js values
Settings.myColor = Color.RED;
console.log(Settings.textInput)

let FragrunInfodisplay = new Display();
// Define the four lines with the corresponding integer values

countData.autosave(1);
var diamanteLine = `§bDiamante: §a${countData.diamanteCount}`;
var lasrLine = `§3L.A.S.R: §a${countData.lasrCount}`;
var bigfootLine = `§cBigfoot: §a${countData.bigfootCount}`;
var jollypinkLine = `§rJolly Pink: §a${countData.jollypinkCount}`;

FragrunInfodisplay.addLine(diamanteLine);
FragrunInfodisplay.addLine(lasrLine);
FragrunInfodisplay.addLine(bigfootLine);
FragrunInfodisplay.addLine(jollypinkLine);
register("tick",() => {
	if(Settings.FragrunInfoBoolean === true){
		FragrunInfodisplay.setRenderLoc(10,10)
		FragrunInfodisplay.show()
	}else if(Settings.FragrunInfoBoolean === false){
		FragrunInfodisplay.hide()
	}
});
register("tick",() =>{
	World.getAllEntitiesOfType(Java.type("net.minecraft.entity.monster.EntityGiantZombie").class).forEach(entity => {
		let living = new EntityLivingBase(entity.getEntity());
		let boots = living.getItemInSlot(1);
		if(boots != null && boots.getID() === 313) {
			if(Settings.NotificationBoolean === true){
				Client.showTitle("&bYou found a §6Diamante&b Giant!","",20,40,20);
			}
			if(Settings.FragrunInfoBoolean === true){
				countData.diamanteCount += 1;
			}
		}
		else if(boots != null && boots.getRawNBT() != null && boots.getRawNBT().includes("14755880")) {
			if(Settings.NotificationBoolean === true){
				Client.showTitle("&bYou found a §6Bigfoot&b Giant!","",20,40,20);
			}
			if(Settings.FragrunInfoBoolean === true){
				countData.bigfootCount += 1;
			}
		}
		else if(boots != null && boots.getRawNBT() != null && boots.getRawNBT().includes("16716947")) {
			if(Settings.NotificationBoolean === true){
				Client.showTitle("&bYou found a §6Jolly Pink&b Giant!","",20,40,20);
			}
			if(Settings.FragrunInfoBoolean === true){
				countData.jollypinkCount+= 1;
			}
		}
		else {
			if(boots != null){
				if(Settings.NotificationBoolean === true){
					Client.showTitle("&bYou found a §6L.A.S.R&b Giant!","",20,40,20);
				}
				if(Settings.FragrunInfoBoolean === true){
					countData.lasrCount+= 1;
				}
			}
			
		}
	});
});