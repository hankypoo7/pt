//---------------------------
// Game
//---------------------------
Pixel = {};
Pixel.State = {};

function hrformat(number) {
	if(Pixel.State.shortFormats) {
		number = number < 1 && number > 0 ? 1 : number;
		var s = ['', 'k', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc'];
		var e = Math.floor(Math.log(number) / Math.log(1000));
		return number < 1000 ? Math.floor(number) : ((number / Math.pow(1000, e)).toFixed(2) + s[e]);
	} else {
		return Math.floor(number);
	}
}

Pixel.Init = function() {
	Pixel.initialized = 0;
	Pixel.Start = function() {
		//---------------------------
		//Check for browser compat
		//---------------------------
		if(typeof(Storage)!=="undefined") {
			//---------------------------
			//Constants
			//---------------------------
			Pixel.version = 'v1.2.1';
			Pixel.initialized = 1;
			Pixel.fps = 120;
			Pixel.saveEvery = 300; //Save every 5 min
			Pixel.maxWidth = 600;
			Pixel.maxHeight = 800;
			Pixel.baseAutoCursorSpeed = 1;
			Pixel.baseAutoCursorUpgradeSpeed = 1;
			Pixel.baseBombReloadSpeed = 36;
			Pixel.autoFinishTime = 30; //Let auto finish trigger after 30s
			Pixel.tabRefreshTime = 1;
			Pixel.baseTimeToParty = 600; //Party Pixel every 10 min
			Pixel.basePartyTime = 15; //Parties last 15s
			Pixel.basePartyRefresh = 0.5;
			Pixel.colors = ['Magenta', 'Aqua', 'Bisque', 'BlueViolet', 'Chartreuse', 'DarkGreen', 
							'DeepPink', 'GreenYellow', 'LightCoral', 'Maroon', 'MidnightBlue', 
							'OrangeRed', 'Red', 'Yellow', 'WhiteSmoke', 'SandyBrown', 'Salmon', 'RoyalBlue'];
			
			//---------------------------
			//Non-saved vars
			//---------------------------
			Pixel.timeToSave = 0;
			Pixel.timeToCursor = 0;
			Pixel.timeToPartyCursor = 0;
			Pixel.timeToBomb = 0;
			Pixel.timeToAutoFinish = 0;
			Pixel.timeToTabRefresh = 0;
			Pixel.timeToParty = 0;
			Pixel.timeToPartyRefresh = 0;
			Pixel.partyTimeLeft = 0;
			Pixel.newsId = 0;
			Pixel.delay = 0;
			Pixel.imageWidth = Pixel.maxWidth;
			Pixel.imageHeight = Pixel.maxHeight;
			Pixel.time = new Date().getTime();
			Pixel.pictureComplete = false;
			Pixel.lastNews = 0;
			Pixel.news = Array();
			Pixel.gameButtonListeners = Array();
			Pixel.gameButtonOverListeners = Array();
			Pixel.overlayImageData = null;
			Pixel.nextImageButtonListener = null;
			Pixel.bombChain = 0;
			Pixel.partyTime = false;
			Pixel.imageLink = "";
			Pixel.partyOverlay = null;
			
			//---------------------------
			//State Variables that will be saved
			//---------------------------
			Pixel.State.firstPlay = Pixel.time;
			Pixel.State.numPixels = 0;
			Pixel.State.pixelsThisImage = 0;
			Pixel.State.manualBombsThisImage = 0;
			Pixel.State.lastRandX = 0;
			Pixel.State.lastRandY = 0;
			Pixel.State.image = undefined;
			Pixel.State.overlay = null;
			Pixel.State.cursorSizeLvl = 1;
			Pixel.State.autoCursorSpeedLvl = 0;
			Pixel.State.cursorBombSizeLvl = 0;
			Pixel.State.cursorBombSpeedLvl = 0;
			Pixel.State.cursorBombChainLvl = 0;
			Pixel.State.cursorBombMaxChainLvl = 1;
			Pixel.State.color = 0;
			Pixel.State.partyPixelPopLvl = 1;
			Pixel.State.autoNextImage = false;
			Pixel.State.nsfwToggle = false;
			Pixel.State.searchTerm = "";
			Pixel.State.bombReady = false;
			Pixel.State.shortFormats = true;
			Pixel.State.nightMode = false;
			Pixel.State.flashingParty = true;
			Pixel.State.history = Array();
			Pixel.State.achievements = new Achievements();
			Pixel.State.upgrades = new Upgrades();
			
			//---------------------------
			//State Variables that will be saved
			//---------------------------
			Pixel.State.stats = {};
			Pixel.State.stats.timePlayed = 0;
			Pixel.State.stats.timePlayedPicture = 0;
			Pixel.State.stats.bestPictureTime = 999999999;
			Pixel.State.stats.worstPictureTime = 0;
			Pixel.State.stats.picturesCompleted = 0;
			Pixel.State.stats.picturesSkipped = 0;
			Pixel.State.stats.pixelsAllTime = 0;
			Pixel.State.stats.pixelsManuallyCollected = 0;
			Pixel.State.stats.pixelsAutoCollected = 0;
			Pixel.State.stats.pixelsBombCollected = 0;
			Pixel.State.stats.maxBombChain = 0;
			Pixel.State.stats.manualPixelsThisImage = 0;
			Pixel.State.stats.bombsLaunched = 0;
			Pixel.State.stats.alreadyUncovered = 0;
			Pixel.State.stats.partiesHad = 0;
			Pixel.State.stats.partiesMissed = 0;
			Pixel.State.stats.partyPopPixels = 0;
			
			Pixel.news.push("默认情况下禁用NSFW图像，但仍未显示未标记的图像。 使用风险由您自己承担");
			Pixel.news.push(" ");
			Pixel.news.push("由于触发器的性质，任何PPS增加超过120pps都不会生效。 很快就会修复™");
			Pixel.news.push("点击这里查看 <a href='changelog.txt' target='_blank'>更新日志</a>");
			
			//Create the random party pixel overlay - we should only ever do this once as it sucks
			if(Pixel.partyOverlay === null) {
				Pixel.partyOverlay = Array();
				for(var ndx = 0; ndx < Pixel.maxHeight*Pixel.maxWidth*4; ndx++) {
					if(ndx%4 !== 3) {
						Pixel.partyOverlay[ndx++] = Math.floor(Math.random()*256);
						Pixel.partyOverlay[ndx++] = Math.floor(Math.random()*256);
						Pixel.partyOverlay[ndx] = Math.floor(Math.random()*256);
					}
				}
			}
			
			//Load the existing state if one exists
			Pixel.LoadGame();
			
			//Setup
			var index = 0;
			$('#pixels').html(hrformat(Pixel.State.numPixels));
			var pps = ((Pixel.State.autoCursorSpeedLvl*Pixel.baseAutoCursorUpgradeSpeed)/Pixel.baseAutoCursorSpeed).toFixed(2);
			$('#pps').html(pps);
			if(Pixel.State.autoCursorSpeedLvl === 0) {
				$('#pps').html("0");
			}
			
			//If we don't have an image stored, get one
			if(Pixel.State.image === undefined) {
				Pixel.GetNewImage();
			} else {
				//Otherwise we have an image, load the existing one
				Pixel.LoadImage(Pixel.State.image);
			}
			
			$("#colorSlider").slider({
				range: "max",
				min: 0,
				max: 255,
				value: Pixel.State.color,
				slide: function( event, ui ) {
					Pixel.ChangePixelColor(ui.value);
				}
			});
			
			//Header Button listeners
			Pixel.UpgradesButtonListener = snack.listener({node: document.getElementById('upgradesHeaderBtn'),
				event: 'click'}, 
				function (){
					$("#info").html("");
					var txt = "<div id='infoHeader' class='infoHeader'>可用的升级:</div><br />";
					$("#info").append(txt);
					
					//Make the buttons
					for(var ndx=0; ndx!==Pixel.State.upgrades.upgradeList.length; ndx++) {
						var upgradeNum = Pixel.State.upgrades.upgradeList[ndx];
						var upgd = Pixel.State.upgrades.upgrades[upgradeNum];
						if(!Pixel.State.upgrades.Check(upgradeNum)) {
							if(upgd.prereq === -1 || Pixel.State.upgrades.Check(upgd.prereq)) {
								txt = "<div class='gameButton' id='upgradeButton"+upgradeNum+"'>"+upgd.name+"</div>";
								$("#info").append(txt);
							
								//Now make the event listeners
								var upgradeNum = Pixel.State.upgrades.upgradeList[ndx];
								var upgd = Pixel.State.upgrades.upgrades[upgradeNum];
								(function (_upgd) {
									var cost = _upgd.cost;
									var popupTxt = "说明: "+_upgd.desc+"<br />";
									if(_upgd.persist && _upgd.tracker) {
										cost = _upgd.costFunc(cost);
										popupTxt += "当前等级: " + _upgd.tracker() + "<br />";
									}
									popupTxt += "成本: "+hrformat(cost)+" 像素<br />";
									
									Pixel.gameButtonListeners[_upgd.id] = snack.listener({node: document.getElementById('upgradeButton'+_upgd.id),
										event: 'click'}, 
										function (event){
											if(cost <= Pixel.State.numPixels) {
												Pixel.State.numPixels -= cost;
												$('#pixels').html(hrformat(Pixel.State.numPixels));
												_upgd.unlockFunction();
												Pixel.UpgradesButtonListener.fire();
											} else {
												Pixel.news.push("你需要更多的像素");
											}
											Pixel.HidePopUpDiv();
										}
									);
									Pixel.gameButtonOverListeners[_upgd.id] = snack.listener({node: document.getElementById('upgradeButton'+_upgd.id),
										event: "mouseover"},
										function(e) {
											$(this).mousemove(function(event){
												Pixel.ShowPopUpDiv(event.pageX, event.pageY, popupTxt);
											});
										}
									);
									
									//Game Buttons - On mouseout
									$('#upgradeButton'+_upgd.id).bind("mouseout",
										function(e) {
											Pixel.HidePopUpDiv();
										}
									);
								})(upgd);
							}
						}
					}
				}
			);
			Pixel.UpgradesButtonListener.fire();
			
			Pixel.imageInfoButtonListener = snack.listener({node: document.getElementById('imageInfoHeaderBtn'),
				event: 'click'}, 
				function (){
					$("#info").html("");
					var txt = "<div id='infoHeader' class='infoHeader'>图片信息:</div><br />";
					if(Pixel.State.upgrades.Check(5)) {
						txt += "<span class='statName'>图片标题:</span> " + Pixel.State.image.title + "<br />";
						txt += "<span class='statName'>图片源:</span> " + Pixel.GetImageLink(Pixel.State.image, "Gallery Link") + "<br />";
						txt += "<span class='statName'>上传日期:</span> "+dateFormat(Pixel.State.image.datetime*1000)+dateFormat(Pixel.State.image.datetime*1000,"Z")+"<br />";
					} else {
						txt += "<div>需要购买!</div><br /><br />";
					}
					if(Pixel.State.upgrades.Check(6)) {
						txt += "<span class='statName'>像素显示:</span> "+Pixel.State.image.score+" Points<br />";
						txt += "<span class='statName'>Imgur Upvotes:</span> "+Pixel.State.image.ups+" Votes<br />";
						txt += "<span class='statName'>Imgur Downvotes:</span> "+Pixel.State.image.downs+" Votes<br />";
						txt += "<span class='statName'>图片宽度:</span> "+Pixel.imageWidth+" (original: "+Pixel.State.image.width+") Pixels<br />";
						txt += "<span class='statName'>图片高度:</span> "+Pixel.imageHeight+" (original: "+Pixel.State.image.height+") Pixels<br />";
					}
					txt += "<br />";
					txt += "<div class='infoHeader'>统计:</div><br />";
					
					if(Pixel.State.upgrades.Check(7)) {
						txt += "<span class='statName'>游戏时间:</span> "+hrformat(Pixel.State.stats.timePlayed)+" 秒<br />";
						txt += "<span class='statName'>在这张图片上的游戏时间:</span> "+hrformat(Pixel.State.stats.timePlayedPicture)+" 秒<br />";
						txt += "<span class='statName'>总共清除的像素:</span> "+hrformat(Pixel.State.stats.pixelsAllTime)+"<br />";
						txt += "<span class='statName'>手动清除的像素:</span> "+hrformat(Pixel.State.stats.pixelsManuallyCollected)+"<br />";
						txt += "<span class='statName'>自动清除的像素:</span> "+hrformat(Pixel.State.stats.pixelsAutoCollected)+"<br />";
						txt += "<span class='statName'>炸弹清除的像素:</span> "+hrformat(Pixel.State.stats.pixelsBombCollected)+"<br />";
						txt += "<span class='statName'>像素派对模式清除的像素:</span> "+hrformat(Pixel.State.stats.partyPopPixels)+"<br />";
						txt += "<span class='statName'>最大炸弹链次数:</span> "+hrformat(Pixel.State.stats.maxBombChain)+"<br />";
						txt += "<span class='statName'>在这张图片上清除的像素:</span> "+hrformat(Pixel.State.pixelsThisImage)+"<br />";
					} else {
						txt += "<div>需要购买!</div><br /><br />";
					}
					if(Pixel.State.upgrades.Check(8)) {
						txt += "<span class='statName'>图像中的总像素数:</span> "+hrformat(Pixel.imageWidth*Pixel.imageHeight)+"<br />";
						txt += "<span class='statName'>图像完成百分比:</span> "+Math.min(100,((Pixel.State.pixelsThisImage/(Pixel.imageWidth*Pixel.imageHeight))*100)).toFixed(2)+"<br />";
                        txt += "<span class='statName'>只靠自动清除完成图片需要的时间</span> "+hrformat((Pixel.imageWidth*Pixel.imageHeight-Pixel.State.pixelsThisImage)/(((Pixel.State.autoCursorSpeedLvl*Pixel.baseAutoCursorUpgradeSpeed)/Pixel.baseAutoCursorSpeed).toFixed(2)))+"秒<br />";
						if(Pixel.State.stats.bestPictureTime === 999999999) {
							txt += "<span class='statName'>最快的图片完成:</span> 无<br />";
						} else {
							txt += "<span class='statName'>最快的图片完成:</span> "+hrformat(Pixel.State.stats.bestPictureTime)+" 秒<br />";
						}
						if(Pixel.State.stats.worstPictureTime === 0) {
							txt += "<span class='statName'>最快的图片完成:</span> None<br />";
						} else {
							txt += "<span class='statName'>最慢的图片完成:</span> "+hrformat(Pixel.State.stats.worstPictureTime)+" 秒<br />";
						}
						txt += "<span class='statName'>已完成图片:</span> "+hrformat(Pixel.State.stats.picturesCompleted)+"<br />";
						txt += "<span class='statName'>跳过的图片:</span> "+hrformat(Pixel.State.stats.picturesSkipped)+"<br />";
					}
					$("#info").html(txt);
				}
			);
			
			Pixel.imageHistoryButtonListener = snack.listener({node: document.getElementById('imageHistoryHeaderBtn'),
				event: 'click'}, 
				function (){
					$("#info").html("");
					var txt = "<div id='infoHeader' class='infoHeader'>图片历史:</div><br />";
					for(var i = Pixel.State.history.length; i !== 0; i--) {
						if(Pixel.State.history[i-1].skipped) {
							txt += "图片 "+i+": " + Pixel.GetImageLink(Pixel.State.history[i-1], Pixel.State.history[i-1].id) +
							        " skipped after "+Pixel.State.history[i-1].time+" 秒";
						} else {
							txt += "图片 "+i+": " + Pixel.GetImageLink(Pixel.State.history[i-1], Pixel.State.history[i-1].id) +
							        " completed in "+Pixel.State.history[i-1].time+" 秒";
						}
						txt += "<br />";
					}
					if(Pixel.State.history.length === 0) {
						txt += "无图片历史";
					}
					$("#info").html(txt);
				}
			);
			
			Pixel.AchievementsButtonListener = snack.listener({node: document.getElementById('achievementsHeaderBtn'),
				event: 'click'}, 
				function (){
					$("#info").html("");
					var txt = "<div id='infoHeader' class='infoHeader'>成就:</div><br />";
					var chievos = Pixel.State.achievements.chievos;
					var ndx = Pixel.State.achievements.chievoList;
					var achieved = Pixel.State.achievements.achieved;
					var achievedOn = Pixel.State.achievements.achievedOn;
					txt += achieved.length+"/"+ndx.length+" 已获得";
					for(var i=0; i!== ndx.length; i++) {
						//Achieved
						var ndx2 = $.inArray(ndx[i], achieved);
						if(ndx2 !== -1) {
							txt += "<div class='chievo achieved'><span class='chievoName'>"+chievos[ndx[i]].name+": </span>";
							txt += chievos[ndx[i]].desc
							txt += "<br />"
							if(Pixel.State.upgrades.Check(5)) {
								if(achievedOn[ndx2] !== null && achievedOn[ndx2] !== "") {
									txt += "Achieved on: " + achievedOn[ndx2];
								} else {
									txt += "Achieved Long Ago";
								}
							} else {
								txt += "Achieved Link Requires Info Purchase";
							}
							txt += "</div>";
						//Hidden
						} else if(chievos[ndx[i]].hidden) {
							txt += "<div class='chievo hiddenChievo'><span class='chievoName'>"+chievos[ndx[i]].name+": </span>HIDDEN???</div>";
						//Normal, unachieved
						} else {
							txt += "<div class='chievo'><span class='chievoName'>"+chievos[ndx[i]].name+": </span>"+chievos[ndx[i]].beforeDesc+"</div>";
						}
					}
					$("#newsDiv").html(txt);
					$("#info").html(txt);
				}
			);
			
			Pixel.menuButtonListener = snack.listener({node: document.getElementById('menuHeaderBtn'),
				event: 'click'}, 
				function (){
					if(Pixel.ImportSaveButtonListener !== undefined) {
						Pixel.ImportSaveButtonListener.detach();
					}
					if(Pixel.SaveGameButtonListener !== undefined) {
						Pixel.SaveGameButtonListener.detach();
					}
					if(Pixel.HardResetButtonListener !== undefined) {
						Pixel.HardResetButtonListener.detach();
					}
					if(Pixel.FormatCheckboxListener !== undefined) {
						Pixel.FormatCheckboxListener.detach();
					}
					if(Pixel.NightModeCheckboxListener !== undefined) {
						Pixel.NightModeCheckboxListener.detach();
					}
					if(Pixel.FlashingCheckboxListener !== undefined) {
						Pixel.FlashingCheckboxListener.detach();
					}
					$("#info").html("");
					var txt = "<div id='infoHeader' class='infoHeader'>菜单:</div><br />";
					txt += "游戏版本号: "+Pixel.version+"<br /><br />";
					txt += "<div id='saveGameButton' class='headerButton'>保存游戏</div>";
					txt += "<div id='hardResetButton' class='headerButton'>硬复位</div>";
					txt += "<div style='height: 5px; clear: both;'></div>";
					txt += "<div style='font-size: 0.7em'>注意：游戏每5分钟自动保存一次</div><br />";
					txt += "<div>数据格式: <input type='checkbox' id='numberFormattingCheckbox' ";
					if(Pixel.State.shortFormats) {
						txt += "checked";
					}
					txt += " /><br /><br />";
					txt += "<div>夜间模式: <input type='checkbox' id='nightModeCheckbox' ";
					if(Pixel.State.nightMode) {
						txt += "checked";
					}
					txt += " /><br /><br />";
					txt += "<div>闪光派对: <input type='checkbox' id='flashingPartyCheckbox' ";
					if(Pixel.State.flashingParty) {
						txt += "checked";
					}
					txt += " /><br /><br />";
					txt += "导出游戏存档（复制并将其保存在安全的地方）:<br />";
					txt += "<textarea style='height:125px; width:330px;'>"+Pixel.ExportSave()+"</textarea>";
					txt += "<br /><br />";
					txt += "导入游戏存档（粘贴您之前保存的代码）:<br />";
					txt += "<textarea id='importSave' name='importSave' style='height:75px; width:330px;'></textarea>";
					txt += "<div id='importSaveButton' class='headerButton'>导入</div>";
					$("#info").html(txt);
					Pixel.ImportSaveButtonListener = snack.listener({node: document.getElementById('importSaveButton'),
						event: 'click'}, 
						function (){
							Pixel.ImportSave($("#importSave").val());
						}
					);
					Pixel.SaveGameButtonListener = snack.listener({node: document.getElementById('saveGameButton'),
						event: 'click'}, 
						function (){
							Pixel.SaveGame();
						}
					);
					Pixel.HardResetButtonListener = snack.listener({node: document.getElementById('hardResetButton'),
						event: 'click'}, 
						function (){
							var erase = confirm('你确定要删除你的游戏进度吗？');
							if(erase) {
								localStorage.removeItem("thePixels");
								location.reload();
							}
						}
					);
					Pixel.FormatCheckboxListener = snack.listener({node: document.getElementById('numberFormattingCheckbox'),
						event: 'click'}, 
						function (){
							Pixel.State.shortFormats = $('#numberFormattingCheckbox').prop('checked');
						}
					);
					Pixel.NightModeCheckboxListener = snack.listener({node: document.getElementById('nightModeCheckbox'),
						event: 'click'}, 
						function (){
							Pixel.State.nightMode = $('#nightModeCheckbox').prop('checked');
							if(Pixel.State.nightMode) {
								$('#body').css('background-color','#121211');
								$('#body').css('color','#ddddd1');
							} else {
								$('#body').css('background-color','#FFF');
								$('#body').css('color','#000');
							}
						}
					);
					Pixel.FlashingCheckboxListener = snack.listener({node: document.getElementById('flashingPartyCheckbox'),
						event: 'click'}, 
						function (){
							Pixel.State.flashingParty = $('#flashingPartyCheckbox').prop('checked');
						}
					);
				}
			);

			Pixel.partyPixelEventListener = snack.listener({node: document.getElementById('partyPixel'),
				event: 'click'},
				function (){
					Pixel.PartyPixelClick();
				}
			);
			Pixel.partyPixelEventListener.detach();
			
			$('#gameContainer').css('display','block');
			$('#version').html(Pixel.version);
			
			ga('send', 'event', 'global', 'gamestart');
			//---------------------------
			//Start the game
			//---------------------------
			Pixel.Loop();
		} else {
			$('#document').css('display','none');
			e('body').innerHTML = "This game requires an HTML5 compliant browser.<br />This" +
					" includes IE8+, Chrome, Firefox, Safari, and Opera.";
			ga('send', 'event', 'error', 'html5');
		}
	};
	
	Pixel.ShowPopUpDiv = function(x, y, txt) {
		$('#popUpDiv').html(txt);
		if(x+160 > document.body.offsetWidth) {
			x = document.body.offsetWidth - 160 - 15;
		}
		if(y+80 > document.body.offsetHeight) {
			y = document.body.offsetHeight - 80 - 15;
		}
		$('#popUpDiv').css('left',x+5+"px");
		$('#popUpDiv').css('top',y+5+"px");
		$('#popUpDiv').css('display','block');
	};
	
	Pixel.HidePopUpDiv = function() {
		$('#popUpDiv').css('display','none');
	};
	
	//Upgrade Unlock Functions
	Pixel.DisplayPixels = function() {
		$('#currency').css('display','inline-table');
		Pixel.State.upgrades.owned.push(0);
	};
	Pixel.AutoCursor = function() {
		Pixel.State.autoCursorSpeedLvl = 1;
		var pps = ((Pixel.State.autoCursorSpeedLvl*Pixel.baseAutoCursorUpgradeSpeed)/Pixel.baseAutoCursorSpeed).toFixed(2);
		if(Pixel.partyTime) {
			pps *= 2;
		}
		$('#pps').html(pps);
		Pixel.State.upgrades.owned.push(1);
	};
	Pixel.AutoCursorSpeedUpgrade = function() {
		Pixel.State.autoCursorSpeedLvl++;
		var pps = ((Pixel.State.autoCursorSpeedLvl*Pixel.baseAutoCursorUpgradeSpeed)/Pixel.baseAutoCursorSpeed).toFixed(2);
		if(Pixel.partyTime) {
			pps *= 2;
		}
		$('#pps').html(pps);
	};
	Pixel.CursorSizeUpgrade = function() {
		Pixel.State.cursorSizeLvl++;
		var canvas = document.getElementById("overlayCanvas");
		canvas.removeEventListener('mousemove', Pixel.canvasMouseOver);
		canvas.addEventListener('mousemove', Pixel.canvasMouseOver);
	};
	Pixel.BasicInfoUnlock = function() {
		Pixel.State.upgrades.owned.push(5);
	};
	Pixel.AdvancedInfoUnlock = function() {
		Pixel.State.upgrades.owned.push(6);
		Pixel.State.achievements.UnlockAchievement(52, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
		ga('send', 'event', 'achievement', 'unlock', 'Chievo 52');
	};
	Pixel.BasicStatsUnlock = function() {
		Pixel.State.upgrades.owned.push(7);
	};
	Pixel.AdvancedStatsUnlock = function() {
		Pixel.State.upgrades.owned.push(8);
		Pixel.State.achievements.UnlockAchievement(53, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
		ga('send', 'event', 'achievement', 'unlock', 'Chievo 53');
	};
	Pixel.CursorBombUnlock = function() {
		Pixel.State.cursorBombSizeLvl = 1;
		Pixel.State.cursorBombSpeedLvl = 1;
		Pixel.State.upgrades.owned.push(10);
		Pixel.State.bombReady = true;
		Pixel.TurnOnBombListener();
	};
	Pixel.CursorBombSizeUpgradeI = function() {
		Pixel.State.cursorBombSizeLvl++;
		Pixel.State.upgrades.owned.push(11);
		Pixel.State.bombReady = true;
	};
	Pixel.CursorBombSizeUpgradeII = function() {
		Pixel.State.cursorBombSizeLvl++;
		Pixel.State.upgrades.owned.push(13);
		Pixel.State.bombReady = true;
	};
	Pixel.CursorBombSizeUpgradeIII = function() {
		Pixel.State.cursorBombSizeLvl++;
		Pixel.State.upgrades.owned.push(14);
		Pixel.State.bombReady = true;
	};
	Pixel.CursorBombSizeUpgradeIV = function() {
		Pixel.State.cursorBombSizeLvl++;
		Pixel.State.upgrades.owned.push(15);
		Pixel.State.bombReady = true;
	};
	Pixel.CursorBombSizeUpgradeV = function() {
		Pixel.State.cursorBombSizeLvl++;
		Pixel.State.upgrades.owned.push(16);
		Pixel.State.bombReady = true;
	};
	Pixel.CursorBombSpeedUpgrade = function() {
		Pixel.State.cursorBombSpeedLvl++;
	};
	Pixel.CursorBombChainUpgrade = function() {
		Pixel.State.cursorBombChainLvl++;
	};
	Pixel.CursorBombMaxChainUpgrade = function() {
		Pixel.State.cursorBombMaxChainLvl++;
	};
	Pixel.AutoFinishImage = function() {
		$('#autoFinishToggle').css("display","block");
		Pixel.State.upgrades.owned.push(18);
	};
	Pixel.PixelColorUnlock = function() {
		$('#colorSliderContainer').css("display","block");
		Pixel.State.upgrades.owned.push(20);
	};
	Pixel.PixelSplitManual1Unlock = function() {
		Pixel.State.upgrades.owned.push(21);
	};
	Pixel.PixelSplitManual2Unlock = function() {
		Pixel.State.upgrades.owned.push(22);
	};
	Pixel.PixelSplitAuto1Unlock = function() {
		Pixel.State.upgrades.owned.push(23);
	};
	Pixel.PixelSplitAuto2Unlock = function() {
		Pixel.State.upgrades.owned.push(24);
	};
	Pixel.PixelSplitBomb1Unlock = function() {
		Pixel.State.upgrades.owned.push(25);
	};
	Pixel.PixelSplitBomb2Unlock = function() {
		Pixel.State.upgrades.owned.push(26);
	};
	Pixel.PartyPixelPop = function() {
		Pixel.State.partyPixelPopLvl++;
	};
    Pixel.PartyPixelSpawn = function() {
        Pixel.State.upgrades.owned.push(27);
    };
    Pixel.PartyPixelDuration = function() {
        Pixel.State.upgrades.owned.push(29);
    };
    Pixel.NsfwUnlock = function() {
        Pixel.State.upgrades.owned.push(30);
        $('#nsfwDiv').css('display','block');
    };
    Pixel.SearchTermUnlock = function() {
        Pixel.State.upgrades.owned.push(31);
        $('#searchTermDiv').css('display','block');
    };
	
	//Upgrade Cost Functions
	Pixel.AutoCursorSpeedCost = function(initial) {
		return Math.floor(initial + initial * Math.pow(1.15,Pixel.State.autoCursorSpeedLvl));
	};
	Pixel.CursorSizeCost = function(initial) {
		return Math.floor(initial * 0.5 * Math.pow(1.25,Pixel.State.cursorSizeLvl));
	};
	Pixel.CursorBombSpeedCost = function(initial) {
		return Math.floor(initial + initial * 0.25 *  Math.pow(Pixel.State.cursorBombSpeedLvl,2));
	};
	Pixel.CursorBombChainCost = function(initial) {
		return Math.floor(initial + initial * 0.5 *  Math.pow(Pixel.State.cursorBombChainLvl,1.5));
	};
	Pixel.CursorBombMaxChainCost = function(initial) {
		return Math.floor(initial + initial * 1.25 *  Math.pow(Pixel.State.cursorBombMaxChainLvl,2));
	};
	Pixel.PartyPixelPopCost = function(initial) {
		return Math.floor(initial + initial * Math.pow(1.2,Pixel.State.partyPixelPopLvl));
	};
	
	//Other Functions
	Pixel.ChangePixelColor = function(color) {
	    var clr = color;
	    if(clr !== "party") {
		    Pixel.State.color = clr;
	    }
		for(var ndx = 0; ndx < Pixel.imageHeight*Pixel.imageWidth*4; ndx++) {
			if(ndx%4 !== 3) {
			    if(clr === "party") {
			        Pixel.overlayImageData.data[ndx] = Pixel.partyOverlay[ndx++];
			        Pixel.overlayImageData.data[ndx] = Pixel.partyOverlay[ndx++];
			        Pixel.overlayImageData.data[ndx] = Pixel.partyOverlay[ndx++];
			    } else {
				    Pixel.overlayImageData.data[ndx++] = clr;
				    Pixel.overlayImageData.data[ndx++] = clr;
				    Pixel.overlayImageData.data[ndx++] = clr;
			    }
			}
		}
		Pixel.WriteOverlayData();
	};
	
	//This is only for Manual and Bomb, Auto is handled in its timer
	Pixel.CollectPixel = function(xPos, yPos, xOff, yOff, type) {
		var ndx = ((xPos+xOff)*4 + (yPos+yOff)*Pixel.imageWidth*4 + 3)%(Pixel.imageHeight*Pixel.imageWidth*4);
		if(ndx < 0) {
			ndx = ndx+(Pixel.imageHeight*Pixel.imageWidth*4);
		}
		var offset = 1;
		if(ndx > 0 && ndx < Pixel.imageHeight*Pixel.imageWidth*4) {
			while(ndx%4 !== 3) {
				ndx = ((xPos+xOff)*4 + (yPos+yOff)*Pixel.imageWidth*4 + 3+offset++)%(Pixel.imageHeight*Pixel.imageWidth*4);
				if(ndx < 0) {
					ndx = ndx+(Pixel.imageHeight*Pixel.imageWidth*4);
				}
			}
			var transparency = Pixel.overlayImageData.data[ndx];
			if(transparency !== 0 && ndx > 0 && ndx < Pixel.imageHeight*Pixel.imageWidth*4) {
				Pixel.State.pixelsThisImage++;
				Pixel.State.stats.pixelsAllTime++;
				if(type === "Manual") {
					Pixel.State.stats.pixelsManuallyCollected++;
					Pixel.State.stats.manualPixelsThisImage++;
					if(Pixel.State.upgrades.Check(22)) {
						Pixel.State.numPixels+=4;
					} else if(Pixel.State.upgrades.Check(21)) {
						Pixel.State.numPixels+=2;
					} else {
						Pixel.State.numPixels+=1;
					}
				} else if(type === "Bomb") {
					Pixel.State.stats.pixelsBombCollected++;
					if(Pixel.State.upgrades.Check(26)) {
						Pixel.State.numPixels+=4;
					} else if(Pixel.State.upgrades.Check(25)) {
						Pixel.State.numPixels+=2;
					} else {
						Pixel.State.numPixels+=1;
					}
				}
				Pixel.overlayImageData.data[ndx] = 0;
			} else if(type === "Manual" && transparency === 0 && ndx < Pixel.imageHeight*Pixel.imageWidth*4) {
				Pixel.State.stats.alreadyUncovered++;
			}
		}
	};
	
	Pixel.WriteOverlayData = function() {
		var canvas = document.getElementById("overlayCanvas");
		var ctx = canvas.getContext("2d");
		ctx.putImageData(Pixel.overlayImageData, 0, 0);
	};
	
	Pixel.canvasMouseOver = function(evt) {
		var canvas = document.getElementById("overlayCanvas");
		var rect = canvas.getBoundingClientRect();
		
		var canvasOffset=$("#overlayCanvas").offset();
		var offsetX=canvasOffset.left;
		var offsetY=canvasOffset.top;

		var mouseX = evt.clientX - Math.floor(rect.left);
		var mouseY = evt.clientY - Math.floor(rect.top);
		
		var offset = 1;
		var i=0;
		var x=0, y=0, xMod=1, yMod=1, cap=0;
		Pixel.CollectPixel(mouseX, mouseY, x, y, "Manual");

		var lvl = Pixel.State.cursorSizeLvl;
		if(Pixel.partyTime) {
		    lvl *= 2;
		}

		while(lvl > 4*cap ) {
			cap++;x=cap;y=0;xMod=1;yMod=1;
			var limit = Math.min(4*cap,(lvl-1-(4*(cap-1))));
			if(Pixel.partyTime) {
				limit *= 2;
			}
			for(i=0; i!== limit; i++) {
				Pixel.CollectPixel(mouseX, mouseY, x, y, "Manual");
				if(Math.abs(x) === cap) {
					xMod *= -1;
				}
				x += xMod;
				if(Math.abs(y) === cap) {
					yMod *= -1;
				}
				y += yMod;
			}
		}
		
		Pixel.WriteOverlayData();
		$('#pixels').html(hrformat(Pixel.State.numPixels));
	};
	
	Pixel.TurnOnBombListener = function() {
		var canvas = document.getElementById("overlayCanvas");
		Pixel.bombListener = canvas.addEventListener('click', function(evt) {
			if(Pixel.State.bombReady) {
				Pixel.State.bombReady = false;
				Pixel.bombChain = 0;
				var rect = canvas.getBoundingClientRect();
				Pixel.NewBombCanvas(evt.clientX - Math.floor(rect.left), evt.clientY - Math.floor(rect.top), 0);
			}
		}, false);
		
		//Credit where credit is due
		//Thanks to http://www.reddit.com/user/Ballpit_Inspector for the
		//following bomb timer code
		var bombDiv = document.getElementById("bomb");
		var bombProgressDiv = document.createElement("div");
		var bombProgress = document.createElement("div");
		bombProgress.id="bombProgress";
		bombProgress.style.width="100%";
		bombProgress.style.height = "5px";
		bombProgress.style.backgroundColor="green";
		 
		bombDiv.appendChild(bombProgressDiv);
		bombProgressDiv.appendChild(bombProgress);
		bombProgressDiv.style.border ="1px solid black";
		 
		var progress = 0;
		setInterval(function(){
			if(Pixel.State.bombReady) {
				progress = '100%';
			} else {
				progress = (100*(Pixel.timeToBomb / (Pixel.baseBombReloadSpeed/(1+0.05*Pixel.State.cursorBombSpeedLvl))))+"%";
			}
			if(Pixel.State.bombReady) {
				progress = "100%";
				bombDiv.style.backgroundColor ="#ED978A";
				bombDiv.style.color = "#FF0000";
				bombProgress.style.backgroundColor="green";
			} else {
				bombDiv.style.backgroundColor ="#6E6E6E";
				bombDiv.style.color = "#424242";
				bombProgress.style.backgroundColor="red";
			}
			bombDiv.style.display="block";
			bombProgress.style.width=progress;
		},10);
		//end credit
	};
			
	Pixel.ColorPixel = function(xPos, yPos, xOff, yOff, turn) {
		var ndx = ((xPos+xOff)*4 + (yPos+yOff)*Pixel.imageWidth*4)%(Pixel.imageHeight*Pixel.imageWidth*4);
		if(ndx < 0) {
			ndx = ndx+(Pixel.imageHeight*Pixel.imageWidth*4);
		}
		var offset = 1;
		while(ndx%4 !== 0) {
			ndx = ((xPos+xOff)*4 + (yPos+yOff)*Pixel.imageWidth*4+offset++)%(Pixel.imageHeight*Pixel.imageWidth*4);
			if(ndx < 0) {
				ndx = ndx+(Pixel.imageHeight*Pixel.imageWidth*4);
			}
		}
		if(ndx < Pixel.imageHeight*Pixel.imageWidth*4) {
			switch(turn) {
				case 0:
					Pixel.overlayImageData.data[ndx] = 204;
					Pixel.overlayImageData.data[ndx+1] = 12;
					Pixel.overlayImageData.data[ndx+2] = 12;
					break;
				case 1:
					Pixel.overlayImageData.data[ndx] = 242;
					Pixel.overlayImageData.data[ndx+1] = 105;
					Pixel.overlayImageData.data[ndx+2] = 19;
					break;
				case 2:
					Pixel.overlayImageData.data[ndx] = 245;
					Pixel.overlayImageData.data[ndx+1] = 252;
					Pixel.overlayImageData.data[ndx+2] = 41;
					break;
			}
		}
	};
	
	Pixel.NewBombCanvas = function(mouseX, mouseY, turn) {
		if(turn === 0) {
			Pixel.State.stats.bombsLaunched++;
			Pixel.State.manualBombsThisImage++;
		}
		//lvl base
		var i=0;
		var x=0, y=0, xMod=1, yMod=1, cap=0;
		if(turn === 3) {
			Pixel.CollectPixel(mouseX, mouseY, x, y, "Bomb");
		} else {
			Pixel.ColorPixel(mouseX, mouseY, x, y, turn);
		}
		
		var keepBombing = true;
		while(keepBombing) {
			cap++;x=cap;y=0;xMod=1;yMod=1;
			var limit = 4*cap;
			for(i=0; i!== limit; i++) {
				if(turn === 3) {
					Pixel.CollectPixel(mouseX, mouseY, x, y, "Bomb");
				} else {
					Pixel.ColorPixel(mouseX, mouseY, x, y, turn);
				}
				if(Math.abs(x) === cap) {
					xMod *= -1;
				}
				x += xMod;
				if(Math.abs(y) === cap) {
					yMod *= -1;
				}
				y += yMod;
			}
			
			var end = 0;
			if(Pixel.State.upgrades.Check(16)) {
				end = Pixel.State.cursorSizeLvl*1.0;
			} else if(Pixel.State.upgrades.Check(15)) {
				end = Pixel.State.cursorSizeLvl*0.9;
			} else if(Pixel.State.upgrades.Check(14)) {
				end = Pixel.State.cursorSizeLvl*0.8;
			} else if(Pixel.State.upgrades.Check(13)) {
				end = Pixel.State.cursorSizeLvl*0.7;
			} else if(Pixel.State.upgrades.Check(11)) {
				end = Pixel.State.cursorSizeLvl*0.6;
			} else if(Pixel.State.upgrades.Check(11)) {
				end = Pixel.State.cursorSizeLvl*0.5;
			} else {
				end = Pixel.State.cursorSizeLvl*0.4;
			}
			end = Math.max(end, 4);
			
			if(cap >= end) {
				keepBombing = false;
			}
				
		}
		
		//Set up the next part of the bomb
		if(turn < 3) {
			var timeout = window.setTimeout(function(){
					Pixel.NewBombCanvas(mouseX, mouseY, turn+1);
				}, 200);
		}
		
		//Write back to the image
		Pixel.WriteOverlayData();
		$('#pixels').html(hrformat(Pixel.State.numPixels));
		
		//Check for a chain
		if(turn === 0 && Pixel.State.cursorBombChainLvl > 0) {
			Math.seedrandom();
			//The bigger the comparator, the harder it is to succeed
			var comparator = 1-(1/Math.sqrt(Pixel.State.cursorBombChainLvl-(Pixel.bombChain)));
			if(Pixel.State.cursorBombChainLvl === 1) {
				//10% base chance on lvl 1, formula starts at 0.0 for lvl 1
				comparator += 0.1;
			}
			
			if(Math.random() < comparator) {
				var randX = Math.floor((Math.random()-0.5)*(40+Pixel.State.cursorSizeLvl))+mouseX;
				var randY = Math.floor((Math.random()-0.5)*(40+Pixel.State.cursorSizeLvl))+mouseY;
				
				ndx = randX*4 + randY*Pixel.imageWidth*4 + 3;
				offset = 1;
				while(ndx%4 !== 3) {
					ndx = randX*4 + randY*Pixel.imageWidth*4 + 3+offset++;
				}
				var chain = Pixel.State.cursorBombMaxChainLvl;
				if(Pixel.partyTime) {
					chain *= 2;
				}
				if(Pixel.bombChain < chain) {
					Pixel.bombChain++;
					if(Pixel.bombChain > Pixel.State.stats.maxBombChain) {
						Pixel.State.stats.maxBombChain = Pixel.bombChain;
					}
					var timeout2 = window.setTimeout(function(){
						Pixel.NewBombCanvas(randX, randY, 0);
					}, 100);
				}
			}
		}
	};
	
	Pixel.SkipImage = function() {
		ga('send', 'event', 'global', 'skipimage');
		Pixel.news.push("图片已跳过");
		Pixel.State.stats.picturesSkipped++;
		Pixel.State.history.push({
			skipped: true,
			id: Pixel.State.image.id,
			time: Math.floor(Pixel.State.stats.timePlayedPicture)
		});

		//Check chievos
		var achieved = Pixel.State.achievements.achieved;
		if(Pixel.State.stats.picturesSkipped >= 100) {
			if($.inArray(74, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(74, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 85');
			}
		} else if(Pixel.State.stats.picturesSkipped >= 50) {
			if($.inArray(73, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(73, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 85');
			}
		} else if(Pixel.State.stats.picturesSkipped >= 25) {
			if($.inArray(72, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(72, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 85');
			}
		} else if(Pixel.State.stats.picturesSkipped >= 5) {
			if($.inArray(71, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(71, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 85');
			}
		} else if(Pixel.State.stats.picturesSkipped >= 1) {
			if($.inArray(70, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(70, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 85');
			}
		}

		Pixel.GetNewImage();
	};
	
	Pixel.GetNewImage = function(incomingPage) {
        var index = 0;
        var page = 1;
        if(incomingPage !== undefined && incomingPage !== null) {
            page = incomingPage;
        }
		var imgurImage = {};
		try {
			var canvas = document.getElementById("overlayCanvas");
			canvas.removeEventListener('mousemove', Pixel.canvasMouseOver);
		} catch(e) {
			console.log(e);
		}
		//Set up our header auth
		$.ajaxSetup({
			headers: { 'Authorization': 'Client-ID 74f45f2bd4ebd51' }
		});
		
		var url = '';
		var searchTerm = $('#searchTerm').val();
		if(searchTerm === "" || page > 10) {
			if(page === 11) {
				Pixel.news.push("Error getting image from search terms, using random gallery");
			}
			//If the search term is empty, get from the random gallery
			url = 'https://api.imgur.com/3/gallery/random/random/'+page;
		} else if(searchTerm.indexOf("/r/") !== -1) {
			//If the search term field has a /r/, do subreddit search
			url = 'https://api.imgur.com/3/gallery'+searchTerm+'/time/'+page;
		} else {
			//Otherwise, it's a search term
			url = 'https://api.imgur.com/3/gallery/search/time/top/'+page+'?q='+searchTerm;
		}
		//Call the imgur API to get a random image
		var imgurResponse = $.get(url
		).done(function() {
			if(imgurResponse.responseJSON.data.length === 0) {
				Pixel.news.push("No data found, bad search term or subreddit. Pulling from random");
				Pixel.GetNewImage(99);
			} else {
				imgurImage = imgurResponse.responseJSON.data[index];
				var nsfw = false;
				var inHistory = false;
				if(index < 59) {
					//If NSFW is checked, don't care about NSFW tag so keep it false
					if(!$('#nsfwCheckbox').prop('checked')) {
						nsfw = imgurImage.nsfw;
					}
					for(var i=0; i!==Pixel.State.history.length; i+=1) {
						if(Pixel.State.history[i].id === imgurImage.id) {
							inHistory = true;
							break;
						}
					}
				}
				while(index < 59 &&
					(imgurImage.is_album ||
					imgurImage.height < 200 ||
					imgurImage.width < 75 ||
					nsfw || inHistory)) {
					index++;
					imgurImage = imgurResponse.responseJSON.data[index];
					inHistory = false;
					//If NSFW is checked, don't care about NSFW tag so keep it false
					if(!$('#nsfwCheckbox').prop('checked')) {
						nsfw = imgurImage.nsfw;
					}
					for(var j=0; j!==Pixel.State.history.length; j+=1) {
						if(Pixel.State.history[j].id === imgurImage.id) {
							inHistory = true;
							break;
						}
					}
				}
			}
		}).fail(function() {
			//If we failed to get an image, just
			imgurImage.id = "blue";
			imgurImage.height = 800;
			imgurImage.width = 600;
			imgurImage.link = "images/blue.png";
			Pixel.news.push("Error getting image from imgur, have a pretty blue image");
		}).always(function() {
			if(imgurResponse.responseJSON.data.length > 0) {
				if(index === 59) {
					//If we hit the max items on a page, try again
					Pixel.GetNewImage(page+1);
				} else {
					ga('send', 'event', 'global', 'newimage');
					Pixel.pictureComplete = false;
					//We got a new image, reset the game
					Pixel.State.overlay = null;
					Pixel.State.image = imgurImage;
					Pixel.State.pixelsThisImage = 0;
					Pixel.State.stats.timePlayedPicture = 0;
					Pixel.State.stats.manualPixelsThisImage = 0;
					Pixel.State.manualBombsThisImage = 0;
					Pixel.State.lastRandX = 0;
					Pixel.State.lastRandY = 0;
					Pixel.LoadImage(imgurImage);
				}
			}
		});
	};
	
	Pixel.LoadImage = function(image) {
		if(image !== null) {
			Pixel.imageWidth = image.width;
			Pixel.imageHeight = image.height;
			var widthPct = Pixel.maxWidth/Pixel.imageWidth;
			var heightPct = Pixel.maxHeight/Pixel.imageHeight;
			if(Pixel.imageWidth > Pixel.maxWidth || Pixel.imageHeight > Pixel.maxHeight) {
				if(widthPct < heightPct) {
					Pixel.imageWidth = Math.floor(Pixel.imageWidth * widthPct);
					Pixel.imageHeight = Math.floor(Pixel.imageHeight * widthPct);
				} else {
					Pixel.imageWidth = Math.floor(Pixel.imageWidth * heightPct);
					Pixel.imageHeight = Math.floor(Pixel.imageHeight * heightPct);
				}
			}
			$('#picture').css('background-image','url("'+image.link+'")');
		}
		$('#gameContainer').css('width',Pixel.imageWidth+'px');
		$('#gameContainer').css('height',Pixel.imageHeight+'px');
		$('#overlayCanvas').attr('width',Pixel.imageWidth+'px');
		$('#overlayCanvas').attr('height',Pixel.imageHeight+'px');
		
		var canvas = document.getElementById("overlayCanvas");
		var ctx = canvas.getContext("2d");
		ctx.width = Pixel.imageWidth;
		ctx.height = Pixel.imageHeight;

		// draw the overlay into the canvas
		if(Pixel.State.overlay !== null) {
			$('#overlay').attr('src',Pixel.State.overlay);
			overlay = document.getElementById("overlay");
			ctx.drawImage(overlay, 0, 0);
		} else {
			ctx.beginPath();
			ctx.fillStyle = "rgba("+Pixel.State.color+", "+Pixel.State.color+", "+Pixel.State.color+", 1.0)";
			ctx.rect(0, 0, Pixel.imageWidth, Pixel.imageHeight);
			ctx.fill();
		}
		
		var overlayImage = ctx.getImageData(0,0,Pixel.imageWidth,Pixel.imageHeight);
		Pixel.overlayImageData = overlayImage;
			
		//Mouse Move event for overlay
		canvas = document.getElementById("overlayCanvas");
		canvas.addEventListener('mousemove', Pixel.canvasMouseOver);
	};

	Pixel.GetImageLink = function(image, text) {
	    if(image.id === "blue") {
	        return "Blue Image";
	    } else {
			return "<a href='http://imgur.com/gallery/" + image.id + "' target='_blank'>" + text + "</a>";
	    }
	};

	//---------------------------
	//Load & Import the Game
	//---------------------------
	Pixel.LoadGame = function() {
		try {
			if(localStorage.getItem("thePixels") !== null && localStorage.getItem("thePixels") !== JSON.stringify({})) {
				//We want to extend the state so that if the user is loading an old version, it works.
				//This only runs into issues if variables change, which means we'll need special cases 
				//whenever that happens.
				jQuery.extend(true,Pixel.State,JSON.parse(localStorage.getItem("thePixels")));
				
				Pixel.news.push(" ");
				Pixel.news.push("像素加载成功");
				
				//Load objects
				var tmpChievo = new Achievements();
				Pixel.State.achievements = tmpChievo.LoadAchievements(Pixel.State.achievements);
				var tmpUpgrades = new Upgrades();
				Pixel.State.upgrades = tmpUpgrades.LoadUpgrades(Pixel.State.upgrades);
				
				//Check stuff
				//If we have the pixel display, turn it on
				if(Pixel.State.upgrades.Check(0)) {
					$('#currency').css('display','inline-table');
				}
				if(Pixel.State.upgrades.Check(10)) {
					Pixel.TurnOnBombListener();
				}
				if(Pixel.State.upgrades.Check(18)) {
					$('#autoFinishToggle').css("display","block");
				}
				if(Pixel.State.upgrades.Check(20)) {
					$('#colorSliderContainer').css("display","block");
				}
                if(Pixel.State.upgrades.Check(30)) {
                    $('#nsfwDiv').css('display','block');
                }
                if(Pixel.State.upgrades.Check(31)) {
                    $('#searchTermDiv').css('display','block');
                }
				
				//This is where we do things that need to be updated from old chievos

				//Other random stuff
				if(Pixel.State.nightMode) {
					$('#body').css('background-color','#121211');
					$('#body').css('color','#ddddd1');
				} else {
					$('#body').css('background-color','#FFF');
					$('#body').css('color','#000');
				}
				
				$('#autoFinishCheckbox').prop('checked', Pixel.State.autoFinishCheckbox);
				$('#nsfwCheckbox').prop('checked', Pixel.State.nsfwToggle);
				$('#searchTerm').val(Pixel.State.searchTerm);
			} else {
				Pixel.news.push(" ");
				Pixel.news.push("没有发现保存的像素");
				var epilepsy = confirm("如果您对癫痫发作敏感，请按取消键关闭闪烁的颜色。稍后可以在菜单中切换此选项。");
				Pixel.State.flashingParty = epilepsy;
			}
		} catch(e) {
			Pixel.news.push(" ");
			Pixel.news.push("Error Loading Saved Pixels");
			//console.log(e.message);
		}
	};
	Pixel.DecryptSave = function(str) {
		var retval = "";
		var i = 0;
		while(i !== str.length) {
			retval += String.fromCharCode(parseInt(str.substr(i, 2), 16));
			i+=2;
		}
		return retval;
	};
	Pixel.ImportSave = function(save) {
		if (save && save!=='') {
			Pixel.State = JSON.parse(Pixel.DecryptSave(save));
		}
		Pixel.SaveGame(false);
		location.reload();
	};
	
	//---------------------------
	//Save & Export the Game
	//---------------------------
	Pixel.EncryptSave = function(str) {
		var retval = "";
		var i = 0;
		while(i !== str.length) {
			retval += str.charCodeAt(i++).toString(16);
		}
		return retval;
	};
	Pixel.ExportSave = function() {
		var state = Pixel.State;
		return Pixel.EncryptSave(JSON.stringify(state));
	};
	
	Pixel.SaveGame = function(saveCanvas) {
		// Grab some user input items
		Pixel.State.autoFinishCheckbox = $('#autoFinishCheckbox').prop('checked');
		Pixel.State.nsfwToggle = $('#nsfwCheckbox').prop('checked');
		Pixel.State.searchTerm = $('#searchTerm').val();
		
		Pixel.UpdateCheck();
		if((saveCanvas === undefined || saveCanvas === true) && !Pixel.partyTime) {
			//Save the overlay, no need to do this every pixel uncovered
			//Don't want to do this during party cause the random colors suck
			var canvas = document.getElementById("overlayCanvas");
			Pixel.State.overlay = canvas.toDataURL();
		}
		//Save the game
		var thePixels = JSON.stringify(Pixel.State);
		localStorage.removeItem("thePixels");
		localStorage.setItem("thePixels", thePixels);
		Pixel.news.push("游戏已保存");
	};
	
	Pixel.UpdateCheck = function() {
		var the_url = "version.html?time="+new Date().getTime();
		$.get(the_url,function(data) {
			if(data !== Pixel.version) {
				$("#version").css('display','block');
				$('#version').html('New Version Available '+data+'<br />Refresh To Get!!');
			}
		});
	};
	
	Pixel.PictureComplete = function() {
		$('#nextImage').css('display', 'block');
		Pixel.news.push(Pixel.GetImageLink(Pixel.State.image, "Image") + " finished, new image obtained");

        //Check picture times
		var achieved = Pixel.State.achievements.achieved;
		if(Pixel.State.stats.bestPictureTime <= 2700) {
			if($.inArray(45, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(45, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 45');
			}
		}
		if(Pixel.State.stats.bestPictureTime <= 1800) {
			if($.inArray(46, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(46, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 46');
			}
		}
		if(Pixel.State.stats.bestPictureTime <= 1200) {
			if($.inArray(47, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(47, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 47');
			}
		}
		if(Pixel.State.stats.bestPictureTime <= 600) {
			if($.inArray(50, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(50, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 50');
			}
		}
		if(Pixel.State.stats.bestPictureTime <= 60) {
			if($.inArray(57, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(57, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 57');
			}
		}

		//Check pictures completed
		if(Pixel.State.stats.picturesCompleted >= 1000) {
			if($.inArray(64, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(64, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 85');
			}
		} else if(Pixel.State.stats.picturesCompleted >= 100) {
			if($.inArray(63, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(63, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 85');
			}
		} else if(Pixel.State.stats.picturesCompleted >= 25) {
			if($.inArray(62, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(62, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 85');
			}
		} else if(Pixel.State.stats.picturesCompleted >= 5) {
			if($.inArray(61, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(61, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 85');
			}
		} else if(Pixel.State.stats.picturesCompleted >= 1) {
			if($.inArray(60, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(60, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 85');
			}
		}

		//Check some other random picture complete chievos
		if(Pixel.State.stats.manualPixelsThisImage === 0) {
			if($.inArray(55, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(55, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 55');
			}
		}
		if(Pixel.State.manualBombsThisImage === 0) {
			if($.inArray(105, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(105, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 105');
			}
		}
		
		Pixel.nextImageButtonListener = snack.listener({node: document.getElementById('nextImage'),
			event: 'click'}, 
			function (){
				Pixel.nextImageButtonListener.detach();
				ga('send', 'event', 'global', 'finishedimage');
				$("#nextImage").css("display", "none");
				Pixel.State.history.push({
					skipped: false,
					id: Pixel.State.image.id,
					time: Math.floor(Pixel.State.stats.timePlayedPicture)
				});
				Pixel.GetNewImage();
			}
		);
	};
	
	//---------------------------
	//Check Achievements
	//---------------------------
	Pixel.CheckChievos = function() {
		var achieved = Pixel.State.achievements.achieved;
		//Total Pixels
		if(Pixel.State.stats.pixelsAllTime >= 100000000000000) {
			if($.inArray(19, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(19, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 19');
			}
		} else if(Pixel.State.stats.pixelsAllTime >= 10000000000000) {
			if($.inArray(18, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(18, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 18');
			}
		} else if(Pixel.State.stats.pixelsAllTime >= 1000000000000) {
			if($.inArray(17, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(17, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 17');
			}
		} else if(Pixel.State.stats.pixelsAllTime >= 100000000000) {
			if($.inArray(16, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(16, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 16');
			}
		} else if(Pixel.State.stats.pixelsAllTime >= 10000000000) {
            if($.inArray(15, achieved) === -1) {
                Pixel.State.achievements.UnlockAchievement(15, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
                ga('send', 'event', 'achievement', 'unlock', 'Chievo 15');
            }
        } else if(Pixel.State.stats.pixelsAllTime >= 1000000000) {
            if($.inArray(14, achieved) === -1) {
                Pixel.State.achievements.UnlockAchievement(14, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
                ga('send', 'event', 'achievement', 'unlock', 'Chievo 14');
            }
        } else if(Pixel.State.stats.pixelsAllTime >= 100000000) {
			if($.inArray(13, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(13, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 13');
			}
		} else if(Pixel.State.stats.pixelsAllTime >= 10000000) {
			if($.inArray(12, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(12, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 12');
			}
		} else if(Pixel.State.stats.pixelsAllTime >= 5000000) {
			if($.inArray(11, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(11, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 11');
			}
		} else if(Pixel.State.stats.pixelsAllTime >= 1000000) {
			if($.inArray(10, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(10, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 10');
			}
		} else if(Pixel.State.stats.pixelsAllTime >= 500000) {
			if($.inArray(9, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(9, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 9');
			}
		} else if(Pixel.State.stats.pixelsAllTime >= 100000) {
			if($.inArray(8, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(8, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 8');
			}
		} else if(Pixel.State.stats.pixelsAllTime >= 50000) {
			if($.inArray(7, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(7, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 7');
			}
		} else if(Pixel.State.stats.pixelsAllTime >= 25000) {
			if($.inArray(6, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(6, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 6');
			}
		} else if(Pixel.State.stats.pixelsAllTime >= 10000) {
			if($.inArray(5, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(5, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 5');
			}
		} else if(Pixel.State.stats.pixelsAllTime >= 5000) {
			if($.inArray(4, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(4, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 4');
			}
		} else if(Pixel.State.stats.pixelsAllTime >= 2500) {
			if($.inArray(3, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(3, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 3');
			}
		} else if(Pixel.State.stats.pixelsAllTime >= 1000) {
			if($.inArray(2, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(2, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 2');
			}
		} else if(Pixel.State.stats.pixelsAllTime >= 500) {
			if($.inArray(1, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(1, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 1');
			}
		} else if(Pixel.State.stats.pixelsAllTime >= 1) {
			if($.inArray(0, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(0, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 0');
			}
		}

		//Manual Pixels
		if(Pixel.State.stats.pixelsManuallyCollected >= 1000000000000000) {
			if($.inArray(24, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(24, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 24');
			}
		} else if(Pixel.State.stats.pixelsManuallyCollected >= 1000000000000) {
			if($.inArray(23, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(23, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 23');
			}
		} else if(Pixel.State.stats.pixelsManuallyCollected >= 1000000000) {
			if($.inArray(22, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(22, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 22');
			}
		} else if(Pixel.State.stats.pixelsManuallyCollected >= 1000000) {
			if($.inArray(21, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(21, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 21');
			}
		} else if(Pixel.State.stats.pixelsManuallyCollected >= 1000) {
            if($.inArray(20, achieved) === -1) {
                Pixel.State.achievements.UnlockAchievement(20, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
                ga('send', 'event', 'achievement', 'unlock', 'Chievo 20');
            }
        }

		//Auto Pixels
		if(Pixel.State.stats.pixelsAutoCollected >= 1000000000000000) {
			if($.inArray(34, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(34, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 34');
			}
		}else if(Pixel.State.stats.pixelsAutoCollected >= 1000000000000) {
			if($.inArray(33, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(33, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 33');
			}
		} else if(Pixel.State.stats.pixelsAutoCollected >= 1000000000) {
			if($.inArray(32, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(32, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 32');
			}
		} else if(Pixel.State.stats.pixelsAutoCollected >= 1000000) {
			if($.inArray(31, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(31, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 31');
			}
		} else if(Pixel.State.stats.pixelsAutoCollected >= 1000) {
            if($.inArray(30, achieved) === -1) {
                Pixel.State.achievements.UnlockAchievement(30, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
                ga('send', 'event', 'achievement', 'unlock', 'Chievo 30');
            }
        }

		//Bomb Pixels
		if(Pixel.State.stats.pixelsBombCollected >= 1000000000000000) {
			if($.inArray(44, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(44, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 44');
			}
		} else if(Pixel.State.stats.pixelsBombCollected >= 1000000000000) {
			if($.inArray(43, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(43, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 43');
			}
		} else if(Pixel.State.stats.pixelsBombCollected >= 1000000000) {
			if($.inArray(42, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(42, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 42');
			}
		} else if(Pixel.State.stats.pixelsBombCollected >= 1000000) {
			if($.inArray(41, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(41, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 41');
			}
		} else if(Pixel.State.stats.pixelsBombCollected >= 1000) {
			if($.inArray(40, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(40, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 40');
			}
		}

		//Misc
		if(Pixel.State.stats.maxBombChain >= 8) {
			if($.inArray(51, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(51, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 51');
			}
		}
		if(Pixel.State.stats.alreadyUncovered >= 10000) {
			if($.inArray(56, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(56, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 85');
			}
		}
		if(Pixel.State.pixelsThisImage >= Pixel.imageHeight*Pixel.imageWidth) {
			if($.inArray(54, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(54, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 54');
			}
		}

		//% Pixels this image
		if(Pixel.State.pixelsThisImage >= Pixel.imageHeight*Pixel.imageWidth*0.99) {
			if($.inArray(85, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(85, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 85');
			}
		} else if(Pixel.State.pixelsThisImage >= Pixel.imageHeight*Pixel.imageWidth*0.75) {
			if($.inArray(84, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(84, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 84');
			}
		} else if(Pixel.State.pixelsThisImage >= Pixel.imageHeight*Pixel.imageWidth*0.5) {
			if($.inArray(83, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(83, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 83');
			}
		} else if(Pixel.State.pixelsThisImage >= Pixel.imageHeight*Pixel.imageWidth*0.25) {
			if($.inArray(82, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(82, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 82');
			}
		} else if(Pixel.State.pixelsThisImage >= Pixel.imageHeight*Pixel.imageWidth*0.1) {
			if($.inArray(81, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(81, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 81');
			}
		} else if(Pixel.State.pixelsThisImage >= Pixel.imageHeight*Pixel.imageWidth*0.01) {
			if($.inArray(80, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(80, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 80');
			}
		}

        //Parties
		if(Pixel.State.stats.partiesMissed >= 1000) {
			if($.inArray(95, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(95, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 95');
			}
		}
		if(Pixel.State.stats.partiesHad >= 1000) {
			if($.inArray(94, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(94, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 94');
			}
		} else if(Pixel.State.stats.partiesHad >= 100) {
			if($.inArray(93, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(93, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 93');
			}
		} else if(Pixel.State.stats.partiesHad >= 50) {
			if($.inArray(92, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(92, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 92');
			}
		} else if(Pixel.State.stats.partiesHad >= 10) {
			if($.inArray(91, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(91, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 91');
			}
		} else if(Pixel.State.stats.partiesHad >= 1) {
			if($.inArray(90, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(90, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 90');
			}
		}

		//Bombs
		if(Pixel.State.stats.bombsLaunched >= 1000) {
			if($.inArray(104, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(104, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 104');
			}
		} else if(Pixel.State.stats.bombsLaunched >= 500) {
			if($.inArray(103, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(103, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 103');
			}
		} else if(Pixel.State.stats.bombsLaunched >= 250) {
			if($.inArray(102, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(102, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 102');
			}
		} else if(Pixel.State.stats.bombsLaunched >= 50) {
			if($.inArray(101, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(101, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 101');
			}
		} else if(Pixel.State.stats.bombsLaunched >= 1) {
			if($.inArray(100, achieved) === -1) {
				Pixel.State.achievements.UnlockAchievement(100, Pixel.GetImageLink(Pixel.State.image, Pixel.State.image.id));
				ga('send', 'event', 'achievement', 'unlock', 'Chievo 100');
			}
		}
	};

	Pixel.LaunchPartyPixel = function() {
		
	    Pixel.partyPixelEventListener.attach();
	    $('#partyPixel').css('display', 'block');
	    //start the pixel somewhere from the top
		$('#partyPixel').css('top', Math.random()*99+'%');
		$('#partyPixel').css('left', '-50px');
		$('#partyPixel').animate(
		    {left: "110%"},
            15000,
            function(){Pixel.State.stats.partiesMissed++;}
		);
	};

	Pixel.PartyPixelClick = function() {
	    Pixel.partyPixelEventListener.detach();
	    ga('send', 'event', 'stats', 'partypixelclick');
	    $('#partyPixel').stop();
	    $('#partyPixel').css('display', 'none');
		$('#partyPixel').css('top', '-100px');
		$('#partyPixel').css('left', '-100px');
		Pixel.State.stats.partyPopPixels += Math.floor(Pixel.State.numPixels*(0.01*Pixel.State.partyPixelPopLvl));
		Pixel.State.numPixels = Math.floor(Pixel.State.numPixels*(1+(0.01*Pixel.State.partyPixelPopLvl)));
		var pps = Math.floor(((Pixel.State.autoCursorSpeedLvl*Pixel.baseAutoCursorUpgradeSpeed)/Pixel.baseAutoCursorSpeed).toFixed(2)*2);
		$('#pps').html(pps);
		Pixel.State.stats.partiesHad++;
        Pixel.partyTime = true;
        $("#colorSlider").attr('disabled',true);
        Pixel.ChangePixelColor("party");
	};
	
	//---------------------------
	//Handle the Processing
	//---------------------------
	Pixel.Logic = function() {
		if(!Pixel.pictureComplete) {
			Pixel.State.stats.timePlayed += 1/Pixel.fps;
			Pixel.State.stats.timePlayedPicture += 1/Pixel.fps;
		
			//Check Picture Complete (If within 1%)
			if(Pixel.State.pixelsThisImage >= Pixel.imageWidth*Pixel.imageHeight*0.999) {
				Pixel.news.push("Picture Complete");
				Pixel.pictureComplete=true;
				Pixel.State.stats.picturesCompleted++;
				if(Pixel.State.stats.timePlayedPicture < Pixel.State.stats.bestPictureTime || Pixel.State.stats.bestPictureTime === 0) {
					Pixel.State.stats.bestPictureTime = Pixel.State.stats.timePlayedPicture;
				}
				if(Pixel.State.stats.timePlayedPicture > Pixel.State.stats.worstPictureTime) {
					Pixel.State.stats.worstPictureTime = Pixel.State.stats.timePlayedPicture;
				}
				Pixel.PictureComplete();
			}
		} else {
			//Else see if the auto new picture is on and start that timer
			if(Pixel.State.upgrades.Check(18) && $('#autoFinishCheckbox').prop('checked')) {
				Pixel.timeToAutoFinish+=1/Pixel.fps;
				if(Pixel.timeToAutoFinish >= Pixel.autoFinishTime) {
					Pixel.nextImageButtonListener.fire();
					Pixel.timeToAutoFinish = 0;
				}
			}
		}
		
		//Save Game
		Pixel.timeToSave+=1/Pixel.fps;
		if(Pixel.timeToSave >= Pixel.saveEvery) {
			Pixel.SaveGame();
			Pixel.timeToSave = 0;
			Pixel.UpdateCheck(); //Check for an update when we save
			ga('send', 'event', 'global', 'savegame', Pixel.version);
			ga('send', 'event', 'stats', 'currPixels', Pixel.State.numPixels);
			ga('send', 'event', 'stats', 'allPixels', Pixel.State.stats.pixelsAllTime);
		}

		//PaRtY PiXeL!
		Pixel.timeToParty+=1/Pixel.fps;
        var timeToParty = Pixel.baseTimeToParty;
        if(Pixel.State.upgrades.Check(27)) {
            timeToParty /= 2;
        }
		if(Pixel.timeToParty >= timeToParty) {
			Pixel.timeToParty = 0;
			Pixel.LaunchPartyPixel();
			ga('send', 'event', 'stats', 'partypixel');
		}
		if(Pixel.partyTime) {
		    Pixel.partyTimeLeft+=1/Pixel.fps;
            var partyTimeLength = Pixel.basePartyTime;
            if(Pixel.State.upgrades.Check(29)) {
                partyTimeLength *= 2;
            }
		    if(Pixel.partyTimeLeft >= partyTimeLength) {
		        //Party time over
		        Pixel.partyTime = false;
		        Pixel.partyTimeLeft = 0;
                Pixel.ChangePixelColor(Pixel.State.color);
                $("#colorSlider").attr('disabled',false);
				var pps = ((Pixel.State.autoCursorSpeedLvl*Pixel.baseAutoCursorUpgradeSpeed)/Pixel.baseAutoCursorSpeed).toFixed(2);
				$('#pps').html(pps);
				if(Pixel.State.nightMode) {
					$('#body').css('background-color', '#121211');
				} else {
					$('#body').css('background-color', 'white');
				}
		    }
		    Pixel.timeToPartyRefresh+=1/Pixel.fps;
		    if(Pixel.timeToPartyRefresh >= Pixel.basePartyRefresh) {
                Pixel.timeToPartyRefresh = 0;
				if(Pixel.State.flashingParty) {
					if(Pixel.State.nightMode) {
						$('#body').css('background-color', "DarkSlateBlue");
					} else {
						$('#body').css('background-color', Pixel.colors[Math.floor(Math.random()*Pixel.colors.length)]);
					}
				}
		    }
		}
		
		//Write the news
		if(Pixel.lastNews !== Pixel.news.length) {
			Pixel.lastNews = Pixel.news.length;
			var news = "";
			var i = Math.min(20,Pixel.news.length);
			while(i !== 0){
				news += Pixel.news[i-1] + "<br />";
				i--;
			}
			$('#breakingNews').html(news);
		}
		
		//Refresh the bomb
		if(Pixel.State.upgrades.Check(10) && !Pixel.State.bombReady) {
			Pixel.timeToBomb+=1/Pixel.fps;
			if(Pixel.partyTime) {
			    Pixel.timeToBomb+=1/Pixel.fps;
			}
			if(Pixel.timeToBomb >= Pixel.baseBombReloadSpeed/(1+0.05*Pixel.State.cursorBombSpeedLvl)) {
				Pixel.State.bombReady = true;
				Pixel.timeToBomb = 0;
			}
		}
		
		//Run the auto cursor
		if(Pixel.State.upgrades.Check(1) && !Pixel.pictureComplete) {
			Pixel.timeToCursor+=1/Pixel.fps;
			if(Pixel.partyTime) {
			    Pixel.timeToCursor+=1/Pixel.fps;
			}
			if(Pixel.timeToCursor >= Pixel.baseAutoCursorSpeed/(Pixel.State.autoCursorSpeedLvl*Pixel.baseAutoCursorUpgradeSpeed)) {
				Pixel.timeToCursor = 0;
				
				var trans = 0;
				var maxTry = 0;
				var ndx = 0;
				var offset = 1;
				//Only try this method up to 20 times, we don't want to get stuck in a loop
				//randomly trying to get like the last pixel
				while(trans === 0 && maxTry !== 50) {
					maxTry++;
					Math.seedrandom();
					var randX = Math.floor(Math.random() * (Pixel.imageWidth+1));
					var randY = Math.floor(Math.random() * (Pixel.imageHeight+1));
					//console.log("Random Try "+maxTry+": "+randX+" - "+randY);
					
					ndx = randX*4 + randY*Pixel.imageWidth*4 + 3;
					offset = 1;
					while(ndx%4 !== 3) {
						ndx = randX*4 + randY*Pixel.imageWidth*4 + 3+offset++;
					}
					trans = Pixel.overlayImageData.data[ndx];
				}
				
				//If we hit the max random tries, time to go pixel by pixel through the image looking for an open one
				var pxpX = Pixel.State.lastRandX;
				var pxpY = Pixel.State.lastRandY;
				while(trans === 0) {
					ndx = pxpX*4 + pxpY*Pixel.imageWidth*4 + 3;
					offset = 1;
					while(ndx%4 !== 3) {
						ndx = pxpX*4 + pxpY*Pixel.imageWidth*4 + 3+offset++;
					}
					trans = Pixel.overlayImageData.data[ndx];
					if(pxpX++ > Pixel.imageWidth){
						pxpX = 0;
						pxpY++;
					}
				}
				Pixel.State.lastRandX = pxpX;
				Pixel.State.lastRandY = pxpY;
				
				if(Pixel.State.upgrades.Check(24)) {
					Pixel.State.numPixels+=4;
				} else if(Pixel.State.upgrades.Check(23)) {
					Pixel.State.numPixels+=2;
				} else {
					Pixel.State.numPixels+=1;
				}
				Pixel.State.pixelsThisImage++;
				Pixel.State.stats.pixelsAllTime++;
				Pixel.State.stats.pixelsAutoCollected++;
				
				Pixel.overlayImageData.data[ndx] = 0;
				
				Pixel.WriteOverlayData();
				$('#pixels').html(hrformat(Pixel.State.numPixels));
			}
		}
		
		//If on Stats page, update the data shown
		if($('#infoHeader').html()==="Image Information:") {
			Pixel.timeToTabRefresh+=1/Pixel.fps;
			if(Pixel.timeToTabRefresh >= Pixel.tabRefreshTime) {
				Pixel.timeToTabRefresh = 0;
				Pixel.imageInfoButtonListener.fire();
			}
		}
		//If on Chievos page, update the data shown
		if($('#infoHeader').html()==="Achievements:") {
			Pixel.timeToTabRefresh+=1/Pixel.fps;
			if(Pixel.timeToTabRefresh >= Pixel.tabRefreshTime) {
				Pixel.timeToTabRefresh = 0;
				Pixel.AchievementsButtonListener.fire();
			}
		}
		
		Pixel.CheckChievos();
	};
	
	//---------------------------
	//Game Loop
	//---------------------------
	Pixel.Loop=function() {
		Pixel.Logic();
		
		//Logic looper for when slow
		Pixel.delay+=((new Date().getTime()-Pixel.time)-1000/Pixel.fps);
		Pixel.delay=Math.min(Pixel.delay,15000);
		Pixel.time=new Date().getTime();
		while(Pixel.delay>0) {
			Pixel.Logic();
			Pixel.delay-=1000/Pixel.fps;
		}
		
		setTimeout(Pixel.Loop,1000/Pixel.fps);
	};
};

window.onload=function() {
	Pixel.Init();
	Pixel.Start();
};
