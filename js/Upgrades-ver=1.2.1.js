function Upgrades() {
	this.upgrades = Array();
	this.upgrades[0] = {
		id: 0,
		name: "Pixel display",
		desc: "Show your hard-earned pixels",
		cost: 500,
		persist: false,
		prereq: -1,
		unlockFunction: Pixel.DisplayPixels
	};
	this.upgrades[1] = {
		id: 1,
		name: "Auto cursor",
		desc: "Automatically collects 1 pixel every 2 seconds",
		cost: 1000,
		persist: false,
		prereq: 0,
		unlockFunction: Pixel.AutoCursor
	};
	this.upgrades[2] = {
		id: 2,
		name: "Automatic cursor speed",
		desc: "Cursor collects pixels faster",
		cost: 2500,
		costFunc: Pixel.AutoCursorSpeedCost,
		tracker: function() { return Pixel.State.autoCursorSpeedLvl; },
		persist: true,
		prereq: 1,
		unlockFunction: Pixel.AutoCursorSpeedUpgrade
	};
	this.upgrades[4] = {
		id: 4,
		name: "Cursor size",
		desc: "Manually collect more pixels at once",
		cost: 5000,
		costFunc: Pixel.CursorSizeCost,
		tracker: function() { return Pixel.State.cursorSizeLvl; },
		persist: true,
		prereq: 1,
		unlockFunction: Pixel.CursorSizeUpgrade
	};
	this.upgrades[5] = {
		id: 5,
		name: "Basic image information",
		desc: "Display the most basic image information",
		cost: 2000,
		persist: false,
		prereq: 1,
		unlockFunction: Pixel.BasicInfoUnlock
	};
	this.upgrades[6] = {
		id: 6,
		name: "Advanced image information",
		desc: "Show more image information",
		cost: 8000,
		persist: false,
		prereq: 7,
		unlockFunction: Pixel.AdvancedInfoUnlock
	};
	this.upgrades[7] = {
		id: 7,
		name: "basic statistics",
		desc: "Show some basic statistics",
		cost: 4000,
		persist: false,
		prereq: 5,
		unlockFunction: Pixel.BasicStatsUnlock
	};
	this.upgrades[8] = {
		id: 8,
		name: "Advanced statistics",
		desc: "Show more statistics",
		cost: 12000,
		persist: false,
		prereq: 6,
		unlockFunction: Pixel.AdvancedStatsUnlock
	};
	this.upgrades[9] = {
		id: 9,
		name: "Get new image",
		desc: "If you don't like the current image, you can get a new image<br />This can be done every 30 seconds",
		cost: 10000,
		persist: true,
		tracker: false,
		prereq: 1,
		unlockFunction: Pixel.SkipImage
	};
	this.upgrades[10] = {
		id: 10,
		name: "cursor bomb",
		desc: "When you click proportional to the cursor sizeï¼ŒDrop Pixel Harvester Bomb",
		cost: 8000,
		persist: false,
		prereq: 1,
		unlockFunction: Pixel.CursorBombUnlock
	};
	this.upgrades[11] = {
		id: 11,
		name: "bomb size I",
		desc: "Make cursor bomb bigger",
		cost: 50000,
		persist: false,
		prereq: 10,
		unlockFunction: Pixel.CursorBombSizeUpgradeI
	};
	this.upgrades[12] = {
		id: 12,
		name: "Bomb reload speed",
		desc: "Made cursor bomb reload faster",
		cost: 10000,
		costFunc: Pixel.CursorBombSpeedCost,
		tracker: function() { return Pixel.State.cursorBombSpeedLvl; },
		persist: true,
		prereq: 10,
		unlockFunction: Pixel.CursorBombSpeedUpgrade
	};
	this.upgrades[13] = {
		id: 13,
		name: "bomb size II",
		desc: "Make cursor bomb bigger",
		cost: 60000,
		persist: false,
		prereq: 11,
		unlockFunction: Pixel.CursorBombSizeUpgradeII
	};
	this.upgrades[14] = {
		id: 14,
		name: "bomb size III",
		desc: "Make cursor bomb bigger",
		cost: 150000,
		persist: false,
		prereq: 13,
		unlockFunction: Pixel.CursorBombSizeUpgradeIII
	};
	this.upgrades[15] = {
		id: 15,
		name: "bomb size IV",
		desc: "Make cursor bomb bigger",
		cost: 600000,
		persist: false,
		prereq: 14,
		unlockFunction: Pixel.CursorBombSizeUpgradeIV
	};
	this.upgrades[16] = {
		id: 16,
		name: "bomb size V",
		desc: "Make cursor bomb bigger",
		cost: 2500000,
		persist: false,
		prereq: 15,
		unlockFunction: Pixel.CursorBombSizeUpgradeV
	};
	this.upgrades[17] = {
		id: 17,
		name: "Bomb chain chance",
		desc: "Increases the chance of a bomb triggering another bomb",
		cost: 10000,
		costFunc: Pixel.CursorBombChainCost,
		tracker: function() { return Pixel.State.cursorBombChainLvl; },
		persist: true,
		prereq: 10,
		unlockFunction: Pixel.CursorBombChainUpgrade
	};
	this.upgrades[18] = {
		id: 18,
		name: "Autocomplete pictures",
		desc: "Unlock switchï¼ŒLet the game finish once an image isï¼Œautomatically start the next image",
		cost: 75000,
		persist: false,
		prereq: 1,
		unlockFunction: Pixel.AutoFinishImage
	};
	this.upgrades[19] = {
		id: 19,
		name: "bomb max chain",
		desc: "Increased the number of triggerable bombs in the chain. The rewards for successive explosions gradually diminish.",
		cost: 4000,
		costFunc: Pixel.CursorBombMaxChainCost,
		tracker: function() { return Pixel.State.cursorBombMaxChainLvl; },
		persist: true,
		prereq: 10,
		unlockFunction: Pixel.CursorBombMaxChainUpgrade
	};
	this.upgrades[20] = {
		id: 20,
		name: "Pixel color",
		desc: "Unlocks a slider that allows you to change pixel color",
		cost: 50000,
		persist: false,
		prereq: 1,
		unlockFunction: Pixel.PixelColorUnlock
	};
	this.upgrades[21] = {
		id: 21,
		name: "Pixel segmentation",
		desc: "Split manually collected pixelsï¼ŒDoubling them into currency",
		cost: 50000,
		persist: false,
		prereq: 1,
		unlockFunction: Pixel.PixelSplitManual1Unlock
	};
	this.upgrades[22] = {
		id: 22,
		name: "Pixel segmentation",
		desc: "Further splitting manually obtained pixelsï¼ŒThey now capture four times the amount of pixels manually eliminated",
		cost: 150000,
		persist: false,
		prereq: 21,
		unlockFunction: Pixel.PixelSplitManual2Unlock
	};
	this.upgrades[23] = {
		id: 23,
		name: "Automatic pixel segmentation",
		desc: "Split automatically collected pixelsï¼ŒDoubling them into currency",
		cost: 50000,
		persist: false,
		prereq: 1,
		unlockFunction: Pixel.PixelSplitAuto1Unlock
	};
	this.upgrades[24] = {
		id: 24,
		name: "Automatic pixel segmentation",
		desc: "Further split automatically obtained pixelsï¼ŒNow they get four times the amount of automatically eliminated pixels",
		cost: 150000,
		persist: false,
		prereq: 23,
		unlockFunction: Pixel.PixelSplitAuto2Unlock
	};
	this.upgrades[25] = {
		id: 25,
		name: "bomb pixel segmentation",
		desc: "Split bomb collected pixelsï¼ŒDoubling them into currency",
		cost: 50000,
		persist: false,
		prereq: 10,
		unlockFunction: Pixel.PixelSplitBomb1Unlock
	};
	this.upgrades[26] = {
		id: 26,
		name: "bomb pixel segmentation",
		desc: "Pixels obtained by further splitting the bombï¼ŒThey now acquire four times the amount of bomb-busting pixels",
		cost: 150000,
		persist: false,
		prereq: 25,
		unlockFunction: Pixel.PixelSplitBomb2Unlock
	};
	this.upgrades[27] = {
		id: 27,
		name: "Pixel party appearance speed",
		desc: "Halved the time between Pixel Party appearances",
		cost: 250000,
		persist: false,
		prereq: 1,
		unlockFunction: Pixel.PartyPixelSpawn
	};
	this.upgrades[28] = {
		id: 28,
		name: "Pixel Party Bonus Pixels",
		desc: "When party pixel pops upï¼ŒBonus pixels will be generated",
		cost: 10000,
		costFunc: Pixel.PartyPixelPopCost,
		tracker: function() { return Pixel.State.partyPixelPopLvl; },
		persist: true,
		prereq: 1,
		unlockFunction: Pixel.PartyPixelPop
	};
    this.upgrades[29] = {
        id: 29,
        name: "partyï¼ŒPixel Party",
        desc: "Pixel parties last twice as long",
        cost: 1250000,
        persist: false,
        prereq: 27,
        unlockFunction: Pixel.PartyPixelDuration
    };
    this.upgrades[30] = {
        id: 30,
        name: "NSFW toggle key",
        desc: "You can switch whether you can see NSFW (not suitable for viewing at work) pictures, not just NSFW pictures.",
        cost: 1000000,
        persist: false,
        prereq: 31,
        unlockFunction: Pixel.NsfwUnlock
    };
    this.upgrades[31] = {
        id: 31,
        name: "Search filter",
        desc: "Allows searching for specific keywords and filtering images from subreddits",
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