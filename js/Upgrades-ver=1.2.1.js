function Upgrades() {
	this.upgrades = Array();
	this.upgrades[0] = {
		id: 0,
		name: "像素显示",
		desc: "显示您辛苦得到的像素",
		cost: 500,
		persist: false,
		prereq: -1,
		unlockFunction: Pixel.DisplayPixels
	};
	this.upgrades[1] = {
		id: 1,
		name: "自动光标",
		desc: "每2秒自动收集1个像素",
		cost: 1000,
		persist: false,
		prereq: 0,
		unlockFunction: Pixel.AutoCursor
	};
	this.upgrades[2] = {
		id: 2,
		name: "自动光标速度",
		desc: "光标可以更快地收集像素",
		cost: 2500,
		costFunc: Pixel.AutoCursorSpeedCost,
		tracker: function() { return Pixel.State.autoCursorSpeedLvl; },
		persist: true,
		prereq: 1,
		unlockFunction: Pixel.AutoCursorSpeedUpgrade
	};
	this.upgrades[4] = {
		id: 4,
		name: "光标大小",
		desc: "手动一次收集更多像素",
		cost: 5000,
		costFunc: Pixel.CursorSizeCost,
		tracker: function() { return Pixel.State.cursorSizeLvl; },
		persist: true,
		prereq: 1,
		unlockFunction: Pixel.CursorSizeUpgrade
	};
	this.upgrades[5] = {
		id: 5,
		name: "基本图像信息",
		desc: "显示最基本的图像信息",
		cost: 2000,
		persist: false,
		prereq: 1,
		unlockFunction: Pixel.BasicInfoUnlock
	};
	this.upgrades[6] = {
		id: 6,
		name: "高级图像信息",
		desc: "显示更多图像信息",
		cost: 8000,
		persist: false,
		prereq: 7,
		unlockFunction: Pixel.AdvancedInfoUnlock
	};
	this.upgrades[7] = {
		id: 7,
		name: "基础统计",
		desc: "显示一些基本统计信息",
		cost: 4000,
		persist: false,
		prereq: 5,
		unlockFunction: Pixel.BasicStatsUnlock
	};
	this.upgrades[8] = {
		id: 8,
		name: "高级统计",
		desc: "显示更多统计信息",
		cost: 12000,
		persist: false,
		prereq: 6,
		unlockFunction: Pixel.AdvancedStatsUnlock
	};
	this.upgrades[9] = {
		id: 9,
		name: "获取新图像",
		desc: "如果您不喜欢当前的图像，则可以获取新图像<br />每30秒可以进行一次",
		cost: 10000,
		persist: true,
		tracker: false,
		prereq: 1,
		unlockFunction: Pixel.SkipImage
	};
	this.upgrades[10] = {
		id: 10,
		name: "光标炸弹",
		desc: "当您点击与光标大小成比例时，丢弃像素采集炸弹",
		cost: 8000,
		persist: false,
		prereq: 1,
		unlockFunction: Pixel.CursorBombUnlock
	};
	this.upgrades[11] = {
		id: 11,
		name: "炸弹大小 I",
		desc: "使光标炸弹更大",
		cost: 50000,
		persist: false,
		prereq: 10,
		unlockFunction: Pixel.CursorBombSizeUpgradeI
	};
	this.upgrades[12] = {
		id: 12,
		name: "炸弹装弹速度",
		desc: "使光标炸弹重新加载更快",
		cost: 10000,
		costFunc: Pixel.CursorBombSpeedCost,
		tracker: function() { return Pixel.State.cursorBombSpeedLvl; },
		persist: true,
		prereq: 10,
		unlockFunction: Pixel.CursorBombSpeedUpgrade
	};
	this.upgrades[13] = {
		id: 13,
		name: "炸弹大小 II",
		desc: "使光标炸弹更大",
		cost: 60000,
		persist: false,
		prereq: 11,
		unlockFunction: Pixel.CursorBombSizeUpgradeII
	};
	this.upgrades[14] = {
		id: 14,
		name: "炸弹大小 III",
		desc: "使光标炸弹更大",
		cost: 150000,
		persist: false,
		prereq: 13,
		unlockFunction: Pixel.CursorBombSizeUpgradeIII
	};
	this.upgrades[15] = {
		id: 15,
		name: "炸弹大小 IV",
		desc: "使光标炸弹更大",
		cost: 600000,
		persist: false,
		prereq: 14,
		unlockFunction: Pixel.CursorBombSizeUpgradeIV
	};
	this.upgrades[16] = {
		id: 16,
		name: "炸弹大小 V",
		desc: "使光标炸弹更大",
		cost: 2500000,
		persist: false,
		prereq: 15,
		unlockFunction: Pixel.CursorBombSizeUpgradeV
	};
	this.upgrades[17] = {
		id: 17,
		name: "炸弹链几率",
		desc: "增加炸弹触发另一枚炸弹的机会",
		cost: 10000,
		costFunc: Pixel.CursorBombChainCost,
		tracker: function() { return Pixel.State.cursorBombChainLvl; },
		persist: true,
		prereq: 10,
		unlockFunction: Pixel.CursorBombChainUpgrade
	};
	this.upgrades[18] = {
		id: 18,
		name: "自动完成图片",
		desc: "解锁开关，让游戏一旦完成一个图像后，就自动开始下一个图像",
		cost: 75000,
		persist: false,
		prereq: 1,
		unlockFunction: Pixel.AutoFinishImage
	};
	this.upgrades[19] = {
		id: 19,
		name: "炸弹最大链",
		desc: "增加链中可触发的炸弹数量。 连续爆炸事件的回报逐渐减少。",
		cost: 4000,
		costFunc: Pixel.CursorBombMaxChainCost,
		tracker: function() { return Pixel.State.cursorBombMaxChainLvl; },
		persist: true,
		prereq: 10,
		unlockFunction: Pixel.CursorBombMaxChainUpgrade
	};
	this.upgrades[20] = {
		id: 20,
		name: "像素颜色",
		desc: "解锁一个允许您更改像素颜色的滑块",
		cost: 50000,
		persist: false,
		prereq: 1,
		unlockFunction: Pixel.PixelColorUnlock
	};
	this.upgrades[21] = {
		id: 21,
		name: "像素分割",
		desc: "拆分手动收集的像素，使它们翻倍后计入货币",
		cost: 50000,
		persist: false,
		prereq: 1,
		unlockFunction: Pixel.PixelSplitManual1Unlock
	};
	this.upgrades[22] = {
		id: 22,
		name: "像素分割",
		desc: "进一步拆分手动获得的像素，现在它们获取的量是手动消除像素的四倍",
		cost: 150000,
		persist: false,
		prereq: 21,
		unlockFunction: Pixel.PixelSplitManual2Unlock
	};
	this.upgrades[23] = {
		id: 23,
		name: "自动像素分割",
		desc: "拆分自动收集的像素，使它们翻倍后计入货币",
		cost: 50000,
		persist: false,
		prereq: 1,
		unlockFunction: Pixel.PixelSplitAuto1Unlock
	};
	this.upgrades[24] = {
		id: 24,
		name: "自动像素分割",
		desc: "进一步拆分自动获得的像素，现在它们获取的量是自动消除像素的四倍",
		cost: 150000,
		persist: false,
		prereq: 23,
		unlockFunction: Pixel.PixelSplitAuto2Unlock
	};
	this.upgrades[25] = {
		id: 25,
		name: "炸弹像素分割",
		desc: "拆分炸弹收集的像素，使它们翻倍后计入货币",
		cost: 50000,
		persist: false,
		prereq: 10,
		unlockFunction: Pixel.PixelSplitBomb1Unlock
	};
	this.upgrades[26] = {
		id: 26,
		name: "炸弹像素分割",
		desc: "进一步拆分炸弹获得的像素，现在它们获取的量是炸弹消除像素的四倍",
		cost: 150000,
		persist: false,
		prereq: 25,
		unlockFunction: Pixel.PixelSplitBomb2Unlock
	};
	this.upgrades[27] = {
		id: 27,
		name: "像素派对出现速度",
		desc: "将像素派对出现的时间间隔减半",
		cost: 250000,
		persist: false,
		prereq: 1,
		unlockFunction: Pixel.PartyPixelSpawn
	};
	this.upgrades[28] = {
		id: 28,
		name: "像素派对奖励像素",
		desc: "弹出派对像素时，会产生奖励像素",
		cost: 10000,
		costFunc: Pixel.PartyPixelPopCost,
		tracker: function() { return Pixel.State.partyPixelPopLvl; },
		persist: true,
		prereq: 1,
		unlockFunction: Pixel.PartyPixelPop
	};
    this.upgrades[29] = {
        id: 29,
        name: "派对，像素派对",
        desc: "像素派对的持续时间是原来的两倍",
        cost: 1250000,
        persist: false,
        prereq: 27,
        unlockFunction: Pixel.PartyPixelDuration
    };
    this.upgrades[30] = {
        id: 30,
        name: "NSFW 切换键",
        desc: "可以切换能否看到NSFW(不适合工作时观看)的图片, 不只是能看到NSFW图片",
        cost: 1000000,
        persist: false,
        prereq: 31,
        unlockFunction: Pixel.NsfwUnlock
    };
    this.upgrades[31] = {
        id: 31,
        name: "检索过滤",
        desc: "允许搜索特定关键词以及从reddit的子版中过滤后获取图片",
        cost: 250000,
        persist: false,
        prereq: 8,
        unlockFunction: Pixel.SearchTermUnlock
    };

	this.upgradeList = Array(0,7,8,5,6,31,30,9,4,1,2,10,12,11,13,14,15,16,17,19,18,20,21,22,23,24,25,26,28,27,29);
	this.owned = Array();
}

Upgrades.prototype = {
	constructor: Upgrades,
	LoadUpgrades:function(old) {
		this.owned = old.owned;
		return this;
	},
	Check:function(ndx) {
		return !($.inArray(ndx, this.owned) == -1);
	}
};
