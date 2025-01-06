function Achievements() {
	this.chievos = Array();
	this.chievos[0] = {
		name: "脱像素器 I",
		hidden: false,
		beforeDesc: "清理 1 像素",
		desc: "清理 1 像素",
		image: "depixel1.png"
	};
	this.chievos[1] = {
		name: "脱像素器 II",
		hidden: false,
		beforeDesc: "清理 500 像素",
		desc: "清理 500 像素, 现在你可以购买物品了!",
		image: "depixel2.png"
	};
	this.chievos[2] = {
		name: "脱像素器 III",
		hidden: false,
		beforeDesc: "清理 1000 像素",
		desc: "清理 1000 像素",
		image: "depixel3.png"
	};
	this.chievos[3] = {
		name: "脱像素器 IV",
		hidden: false,
		beforeDesc: "清理 2500 像素",
		desc: "清理 2500 像素",
		image: "depixel4.png"
	};
	this.chievos[4] = {
		name: "脱像素器 V",
		hidden: false,
		beforeDesc: "清理 5000 像素",
		desc: "清理 5000 像素",
		image: "depixel5.png"
	};
	this.chievos[5] = {
		name: "脱像素器 VI",
		hidden: false,
		beforeDesc: "清理 10000 像素",
		desc: "清理 10000 pixels, now we're getting somewhere",
		image: "depixel6.png"
	};
	this.chievos[6] = {
		name: "脱像素器 VII",
		hidden: false,
		beforeDesc: "清理 25000 像素",
		desc: "清理 25000 像素",
		image: "depixel7.png"
	};
	this.chievos[7] = {
		name: "脱像素器 VIII",
		hidden: false,
		beforeDesc: "清理 50000 像素",
		desc: "清理 50000 像素",
		image: "depixel8.png"
	};
	this.chievos[8] = {
		name: "脱像素器 IX",
		hidden: false,
		beforeDesc: "清理 100k 像素",
		desc: "清理 100k 像素",
		image: "depixel9.png"
	};
	this.chievos[9] = {
		name: "脱像素器 X",
		hidden: false,
		beforeDesc: "清理 500k 像素",
		desc: "清理 500k 像素",
		image: "depixel10.png"
	};
	this.chievos[10] = {
		name: "巨型脱像素器 I",
		hidden: false,
		beforeDesc: "清理 1M 像素",
		desc: "清理 1M 像素",
		image: "megadepixel1.png"
	};
	this.chievos[11] = {
		name: "巨型脱像素器 II",
		hidden: false,
		beforeDesc: "清理 5M 像素",
		desc: "清理 5M 像素",
		image: "megadepixel2.png"
	};
	this.chievos[12] = {
		name: "巨型脱像素器 III",
		hidden: false,
		beforeDesc: "清理 10M 像素",
		desc: "清理 10M 像素",
		image: "megadepixel3.png"
	};
	this.chievos[13] = {
		name: "巨型脱像素器 IV",
		hidden: false,
		beforeDesc: "清理 100M 像素",
		desc: "清理 100M 像素",
		image: "megadepixel4.png"
	};
	this.chievos[14] = {
		name: "巨型脱像素器 V",
		hidden: false,
		beforeDesc: "清理 1B 像素",
		desc: "清理 1B 像素",
		image: "megadepixel5.png"
	};
	this.chievos[15] = {
		name: "巨型脱像素器 VI",
		hidden: false,
		beforeDesc: "清理 10B 像素",
		desc: "清理 10B 像素",
		image: "megadepixel6.png"
	};
	this.chievos[16] = {
		name: "巨型脱像素器 VII",
		hidden: false,
		beforeDesc: "清理 100B 像素",
		desc: "清理 100B 像素",
		image: "megadepixel7.png"
	};
	this.chievos[17] = {
		name: "巨型脱像素器 VIII",
		hidden: false,
		beforeDesc: "清理 1T 像素",
		desc: "清理 1T 像素",
		image: "megadepixel8.png"
	};
	this.chievos[18] = {
		name: "巨型脱像素器 IX",
		hidden: false,
		beforeDesc: "清理 10T 像素",
		desc: "清理 10T 像素",
		image: "megadepixel9.png"
	};
	this.chievos[19] = {
		name: "巨型脱像素器 X",
		hidden: false,
		beforeDesc: "清理 100T 像素",
		desc: "清理 100T 像素",
		image: "megadepixel10.png"
	};
	this.chievos[20] = {
		name: "Manual Picker I",
		hidden: false,
		beforeDesc: "Manually uncover 1k 像素",
		desc: "Manually uncovered 1k 像素",
		image: "manual1.png"
	};
	this.chievos[21] = {
		name: "Manual Picker II",
		hidden: false,
		beforeDesc: "Manually uncover 1M 像素",
		desc: "Manually uncovered 1M 像素",
		image: "manual2.png"
	};
	this.chievos[22] = {
		name: "Manual Picker III",
		hidden: false,
		beforeDesc: "Manually uncover 1B 像素",
		desc: "Manually uncovered 1B 像素",
		image: "manual3.png"
	};
	this.chievos[23] = {
		name: "Manual Picker IV",
		hidden: false,
		beforeDesc: "Manually uncover 1T 像素",
		desc: "Manually uncovered 1T 像素",
		image: "manual4.png"
	};
	this.chievos[24] = {
		name: "Manual Picker V",
		hidden: false,
		beforeDesc: "Manually uncover 1Qu 像素",
		desc: "Manually uncovered 1Qu 像素",
		image: "manual5.png"
	};
	this.chievos[30] = {
		name: "Auto Picker I",
		hidden: false,
		beforeDesc: "Automatically uncover 1k 像素",
		desc: "Automatically uncovered 1k 像素",
		image: "auto1.png"
	};
	this.chievos[31] = {
		name: "Auto Picker II",
		hidden: false,
		beforeDesc: "Automatically uncover 1M 像素",
		desc: "Automatically uncovered 1M 像素",
		image: "auto2.png"
	};
	this.chievos[32] = {
		name: "Auto Picker III",
		hidden: false,
		beforeDesc: "Automatically uncover 1B 像素",
		desc: "Automatically uncovered 1B 像素",
		image: "auto3.png"
	};
	this.chievos[33] = {
		name: "Auto Picker IV",
		hidden: false,
		beforeDesc: "Automatically uncover 1T 像素",
		desc: "Automatically uncovered 1T 像素",
		image: "auto4.png"
	};
	this.chievos[34] = {
		name: "Auto Picker V",
		hidden: false,
		beforeDesc: "Automatically uncover 1Qu 像素",
		desc: "Automatically uncovered 1Qu 像素",
		image: "auto5.png"
	};
	this.chievos[40] = {
		name: "Bomber I",
		hidden: false,
		beforeDesc: "清理 1k pixels with bombs",
		desc: "清理 1k pixels with bombs",
		image: "bomb1.png"
	};
	this.chievos[41] = {
		name: "Bomber II",
		hidden: false,
		beforeDesc: "清理 1M pixels with bombs",
		desc: "清理 1M pixels with bombs",
		image: "bomb2.png"
	};
	this.chievos[42] = {
		name: "Bomber III",
		hidden: false,
		beforeDesc: "清理 1B pixels with bombs",
		desc: "清理 1B pixels with bombs",
		image: "bomb3.png"
	};
	this.chievos[43] = {
		name: "Bomber IV",
		hidden: false,
		beforeDesc: "清理 1T pixels with bombs",
		desc: "清理 1T pixels with bombs",
		image: "bomb4.png"
	};
	this.chievos[44] = {
		name: "Bomber V",
		hidden: false,
		beforeDesc: "清理 1Qu pixels with bombs",
		desc: "清理 1Qu pixels with bombs",
		image: "bomb5.png"
	};
	this.chievos[45] = {
		name: "Speedy",
		hidden: false,
		beforeDesc: "Finish a picture in under 2700 seconds",
		desc: "Finished a picture in under 2700 seconds",
		image: "speedy1.png"
	};
	this.chievos[46] = {
		name: "Speedier",
		hidden: false,
		beforeDesc: "Finish a picture in under 1800 seconds",
		desc: "Finished a picture in under 1800 seconds",
		image: "speedy2.png"
	};
	this.chievos[47] = {
		name: "Speediest",
		hidden: false,
		beforeDesc: "Finish a picture in under 1200 seconds",
		desc: "Finished a picture in under 1200 seconds",
		image: "speedy3.png"
	};
	this.chievos[50] = {
		name: "Most Speediest",
		hidden: true,
		beforeDesc: "Finish a picture in under 600 seconds",
		desc: "Finished a picture in under 600 seconds",
		image: "speedy4.png"
	};
	this.chievos[51] = {
		name: "Chain Master",
		hidden: true,
		beforeDesc: "Get a bomb chain of more than 8",
		desc: "Got a bomb chain of more than 8",
		image: "chain.png"
	};
	this.chievos[52] = {
		name: "Information Addict",
		hidden: true,
		beforeDesc: "解锁所有图像信息升级",
		desc: "解锁所有图像信息升级",
		image: "infoaddict.png"
	};
	this.chievos[53] = {
		name: "Statistics Addict",
		hidden: true,
		beforeDesc: "Unlock all the statistic upgrades",
		desc: "Unlocked all the statistic upgrades",
		image: "stataddict.png"
	};
	this.chievos[54] = {
		name: "Completionist",
		hidden: true,
		beforeDesc: "清理 every pixel in an image before moving on (Auto only works to 99.9%)",
		desc: "清理 every pixel in an image",
		image: "completionist.png"
	};
	this.chievos[55] = {
		name: "Bored",
		hidden: true,
		beforeDesc: "Finish an image without manually collecting any 像素",
		desc: "Finished an image without manually collecting any 像素",
		image: "bored.png"
	};
	this.chievos[56] = {
		name: "Got Those",
		hidden: true,
		beforeDesc: "Try to uncover 10000 pixels that have already been uncovered",
		desc: "清理 10000 pixels that have already been uncovered",
		image: "gotthose.png"
	};
	this.chievos[57] = {
		name: "True Speedster",
		hidden: true,
		beforeDesc: "Finish a picture in under 60 seconds",
		desc: "Finished a picture in under 60 seconds",
		image: "speedy5.png"
	};
	this.chievos[60] = {
		name: "Picturesque I",
		hidden: false,
		beforeDesc: "Finish 1 图像",
		desc: "Finished 1 图像",
		image: "picture1.png"
	};
	this.chievos[61] = {
		name: "Picturesque II",
		hidden: false,
		beforeDesc: "Finish 5 图片",
		desc: "Finished 5 图片",
		image: "picture2.png"
	};
	this.chievos[62] = {
		name: "Picturesque III",
		hidden: false,
		beforeDesc: "Finish 25 图片",
		desc: "Finished 25 图片",
		image: "picture3.png"
	};
	this.chievos[63] = {
		name: "Picturesque IV",
		hidden: false,
		beforeDesc: "Finish 100 图片",
		desc: "Finished 100 图片",
		image: "picture4.png"
	};
	this.chievos[64] = {
		name: "Picturesque V",
		hidden: false,
		beforeDesc: "Finish 1000 图片",
		desc: "Finished 1000 图片",
		image: "picture5.png"
	};
	this.chievos[70] = {
		name: "Uncultured Swine I",
		hidden: false,
		beforeDesc: "跳过 1 图像",
		desc: "跳过 1 图像",
		image: "skip1.png"
	};
	this.chievos[71] = {
		name: "Uncultured Swine II",
		hidden: false,
		beforeDesc: "跳过 5 图片",
		desc: "跳过 5 图片",
		image: "skip2.png"
	};
	this.chievos[72] = {
		name: "Uncultured Swine III",
		hidden: false,
		beforeDesc: "跳过 25 图片",
		desc: "跳过 25 图片",
		image: "skip3.png"
	};
	this.chievos[73] = {
		name: "Uncultured Swine IV",
		hidden: false,
		beforeDesc: "跳过 50 图片",
		desc: "跳过 50 图片",
		image: "skip4.png"
	};
	this.chievos[74] = {
		name: "Uncultured Swine V",
		hidden: false,
		beforeDesc: "跳过 100 图片",
		desc: "跳过 100 图片",
		image: "skip5.png"
	};
	this.chievos[80] = {
		name: "Getting Started I",
		hidden: false,
		beforeDesc: "清理 1% of your first image",
		desc: "清理 1% of your first image",
		image: "start1.png"
	};
	this.chievos[81] = {
		name: "Getting Started II",
		hidden: false,
		beforeDesc: "清理 10% of your first image",
		desc: "清理 10% of your first image",
		image: "start2.png"
	};
	this.chievos[82] = {
		name: "Getting Started III",
		hidden: false,
		beforeDesc: "清理 25% of your first image",
		desc: "清理 25% of your first image",
		image: "start3.png"
	};
	this.chievos[83] = {
		name: "Getting Started IV",
		hidden: false,
		beforeDesc: "清理 50% of your first image",
		desc: "清理 50% of your first image",
		image: "start4.png"
	};
	this.chievos[84] = {
		name: "Getting Started V",
		hidden: false,
		beforeDesc: "清理 75% of your first image",
		desc: "清理 75% of your first image",
		image: "start5.png"
	};
	this.chievos[85] = {
		name: "Getting Started VI",
		hidden: false,
		beforeDesc: "清理 99% of your first image",
		desc: "清理 99% of your first image",
		image: "start6.png"
	};
	this.chievos[90] = {
		name: "Partier I",
		hidden: false,
		beforeDesc: "Have a pixel party!",
		desc: "You had your first pixel party!",
		image: "party1.png"
	};
	this.chievos[91] = {
		name: "Partier II",
		hidden: false,
		beforeDesc: "Have 10 pixel parties",
		desc: "You've had 10 pixel parties",
		image: "party2.png"
	};
	this.chievos[92] = {
		name: "Partier III",
		hidden: false,
		beforeDesc: "Have 50 pixel parties",
		desc: "You've had 50 pixel parties",
		image: "party3.png"
	};
	this.chievos[93] = {
		name: "Partier IV",
		hidden: false,
		beforeDesc: "Have 100 pixel parties",
		desc: "You've had 100 pixel parties",
		image: "party4.png"
	};
	this.chievos[94] = {
		name: "Partier V",
		hidden: false,
		beforeDesc: "Have 1000 pixel parties",
		desc: "You've had 1000 pixel parties",
		image: "party5.png"
	};
	this.chievos[95] = {
		name: "Party Pooper",
		hidden: true,
		beforeDesc: "Miss 1000 pixel parties",
		desc: "You've missed 1000 pixel parties :-(",
		image: "partypooper.png"
	};
	this.chievos[100] = {
		name: "Bomberman I",
		hidden: false,
		beforeDesc: "Launch 1 bomb",
		desc: "Launched your first bomb!",
		image: "bomber1.png"
	};
	this.chievos[101] = {
		name: "Bomberman II",
		hidden: false,
		beforeDesc: "Explode 50 bombs",
		desc: "50 bombs have exploded",
		image: "bomber2.png"
	};
	this.chievos[102] = {
		name: "Bomberman III",
		hidden: false,
		beforeDesc: "Explode 250 bombs",
		desc: "250 bombs have exploded",
		image: "bomber3.png"
	};
	this.chievos[103] = {
		name: "Bomberman IV",
		hidden: false,
		beforeDesc: "Explode 500 bombs",
		desc: "500 bombs have exploded",
		image: "bomber4.png"
	};
	this.chievos[104] = {
		name: "Bomberman V",
		hidden: false,
		beforeDesc: "Explode 1000 bombs",
		desc: "1000 bombs have exploded",
		image: "bomber5.png"
	};
	this.chievos[105] = {
		name: "Pacifist",
		hidden: true,
		beforeDesc: "Complete an image without launching a bomb",
		desc: "Completed an image without using any bombs",
		image: "pacifist1.png"
	};
	this.chievoList = Array(80,81,82,83,84,85,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,30,31,32,33,34,40,41,
		42,43,44,45,46,47,60,61,62,63,64,70,71,72,73,74,50,57,51,52,53,54,55,56,90,91,92,93,94,95,100,101,102,103,104,105);
	this.achieved = Array();
	this.achievedOn = Array();
}

Achievements.prototype = {
	constructor: Achievements,
	LoadAchievements:function(old) {
		this.achieved = old.achieved;
		if(old.achievedOn !== undefined){
		    this.achievedOn = old.achievedOn;
		}
		return this;
	},
	ToastAchievement:function(ndx) {
		$('#toaster').append("<div class='toastDiv' id='toast"+ndx+"'><div class='toastHeader'>成就解锁！</div><div class='toastChievo'>"+
			this.chievos[ndx].name+"</div><span class='toastDesc'>"+this.chievos[ndx].desc+"</span></div>");
		$('#toast'+ndx).delay(2000).fadeOut(6000);
	},
	UnlockAchievement:function(ndx, link) {
		this.achieved.push(ndx);
		this.achievedOn[this.achieved.length-1] = link;
		this.ToastAchievement(ndx);
	}
}
