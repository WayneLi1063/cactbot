'use strict';

[{
  zoneRegex: {
    en: /^Eden's Gate: Sepulture \(Savage\)$/,
    cn: /^伊甸零式希望乐园 \(觉醒之章4\)$/,
    ko: /^희망의 낙원 에덴: 각성편\(영웅\) \(4\)$/,
  },
  timelineFile: 'e4s.txt',
  timelineTriggers: [
    {
      id: 'E4S Earthen Anguish',
      regex: /Earthen Anguish/,
      beforeSeconds: 3,
      condition: function(data) {
        return data.role == 'healer' || data.role == 'tank';
      },
      alertText: {
        en: 'Tank Busters',
        de: 'Tank buster',
        fr: 'Tank busters',
        ja: 'タンクバスター',
        cn: '坦克死刑',
        ko: '탱버',
      },
    },
  ],
  triggers: [
    {
      id: 'E4S Earthen Gauntlets',
      regex: Regexes.ability({ id: '40E6', source: 'Titan', capture: false }),
      regexDe: Regexes.ability({ id: '40E6', source: 'Titan', capture: false }),
      regexFr: Regexes.ability({ id: '40E6', source: 'Titan', capture: false }),
      regexJa: Regexes.ability({ id: '40E6', source: 'タイタン', capture: false }),
      regexCn: Regexes.ability({ id: '40E6', source: '泰坦', capture: false }),
      regexKo: Regexes.ability({ id: '40E6', source: '타이탄', capture: false }),
      run: function(data) {
        data.phase = 'landslide';
        delete data.printedBury;
      },
    },
    {
      id: 'E4S Earthen Armor',
      regex: Regexes.ability({ id: '40E7', source: 'Titan', capture: false }),
      regexDe: Regexes.ability({ id: '40E7', source: 'Titan', capture: false }),
      regexFr: Regexes.ability({ id: '40E7', source: 'Titan', capture: false }),
      regexJa: Regexes.ability({ id: '40E7', source: 'タイタン', capture: false }),
      regexCn: Regexes.ability({ id: '40E7', source: '泰坦', capture: false }),
      regexKo: Regexes.ability({ id: '40E7', source: '타이탄', capture: false }),
      run: function(data) {
        data.phase = 'armor';
        delete data.printedBury;
      },
    },
    {
      id: 'E4S Stonecrusher',
      regex: / 14:4116:Titan starts using Stonecrusher on (\y{Name})/,
      regexCn: / 14:4116:泰坦 starts using 崩岩 on (\y{Name})/,
      regexDe: / 14:4116:Titan starts using Felsbrecher on (\y{Name})/,
      regexFr: / 14:4116:Titan starts using Éruption Tellurique on (\y{Name})/,
      regexJa: / 14:4116:タイタン starts using ロッククラッシュ on (\y{Name})/,
      regexKo: / 14:4116:타이탄 starts using 암석 붕괴 on (\y{Name})/,
      alertText: function(data, matches) {
        if (matches[1] == data.me) {
          return {
            en: 'Tank Buster on YOU',
            de: 'Tankbuster auf DIR',
            fr: 'Tankbuster sur VOUS',
            ja: '自分にタンクバスター',
            cn: '死刑点名',
            ko: '탱버 대상자',
          };
        }
      },
      // As this seems to usually seems to be invulned,
      // don't make a big deal out of it.
      infoText: function(data, matches) {
        if (matches[1] == data.me)
          return;
        if (data.role != 'tank' && data.role != 'healer')
          return;

        return {
          en: 'Buster on ' + data.ShortName(matches[1]),
          de: 'Tankbuster auf ' + data.ShortName(matches[1]),
          fr: 'Tankbuster sur ' + data.ShortName(matches[1]),
          ja: data.ShortName(matches[1]) + 'にタンクバスター',
          cn: '死刑点 ' + data.ShortName(matches[1]),
          ko: '"' + data.ShortName(matches[1]) + '" 탱버',
        };
      },
    },
    {
      id: 'E4S Pulse of the Land',
      regex: Regexes.headMarker({ id: '00B9' }),
      condition: function(data, matches) {
        return data.me == matches.target;
      },
      alertText: {
        en: 'Spread Marker',
        de: 'Verteilen-Marker',
        fr: 'Marque de dispersion',
        ja: '黄色: 散開',
        cn: '黄色：散开',
        ko: '징: 산개',
      },
    },
    {
      id: 'E4S Evil Earth',
      regex: / 14:410C:Titan starts using Evil Earth/,
      regexCn: / 14:410C:泰坦 starts using 邪土/,
      regexDe: / 14:410C:Titan starts using Grimm der Erde/,
      regexFr: / 14:410C:Titan starts using Terre Maléfique/,
      regexJa: / 14:410C:タイタン starts using イビルアース/,
      regexKo: / 14:410C:타이탄 starts using 사악한 대지/,
      suppressSeconds: 1,
      infoText: {
        en: 'Look for Evil Earth Marker',
        de: 'Schau nach den Grimm der Erde Marker',
        fr: 'Repérez une marque de Terre maléfique',
        ja: '範囲見て',
        cn: '观察地板',
        ko: '사악한 대지 패턴 확인',
      },
    },
    {
      id: 'E4S Force of the Land',
      regex: Regexes.headMarker({ id: '00BA' }),
      condition: function(data, matches) {
        return data.me == matches.target;
      },
      alertText: {
        en: 'Stack Marker',
        de: 'Sammeln-Marker',
        fr: 'Marque de package',
        ja: '橙色: スタック',
        cn: '橙色：集合',
        ko: '모이기 징',
      },
    },
    {
      id: 'E4S Voice of the Land',
      regex: / 14:4114:Titan starts using Voice [Oo]f [Tt]he Land/,
      regexCn: / 14:4114:泰坦 starts using 大地之号/,
      regexDe: / 14:4114:Titan starts using Aufschrei der Erde/,
      regexFr: / 14:4114:Titan starts using Hurlement Tellurique/,
      regexJa: / 14:4114:タイタン starts using 大地の叫び/,
      regexKo: / 14:4114:타이탄 starts using 대지의 외침/,
      condition: function(data) {
        return data.role == 'healer';
      },
      infoText: {
        en: 'aoe',
        de: 'AoE',
        fr: 'Dégâts de zone',
        ja: 'AoE',
        cn: 'AOE',
        ko: '전체 공격',
      },
    },
    {
      id: 'E4S Geocrush',
      regex: / 14:4113:Titan starts using Geocrush/,
      regexCn: / 14:4113:泰坦 starts using 大地粉碎/,
      regexDe: / 14:4113:Titan starts using Kraterschlag/,
      regexFr: / 14:4113:Titan starts using Broie-Terre/,
      regexJa: / 14:4113:タイタン starts using ジオクラッシュ/,
      regexKo: / 14:4113:타이탄 starts using 대지 붕괴/,
      alertText: {
        en: 'Knockback',
        de: 'Rückstoß',
        fr: 'Poussée',
        ja: 'ノックバック',
        cn: '击退',
        ko: '넉백',
      },
    },
    {
      id: 'E4S Massive Landslide - Front',
      regex: Regexes.ability({ id: '40E6', source: 'Titan', capture: false }),
      regexDe: Regexes.ability({ id: '40E6', source: 'Titan', capture: false }),
      regexFr: Regexes.ability({ id: '40E6', source: 'Titan', capture: false }),
      regexJa: Regexes.ability({ id: '40E6', source: 'タイタン', capture: false }),
      regexCn: Regexes.ability({ id: '40E6', source: '泰坦', capture: false }),
      regexKo: Regexes.ability({ id: '40E6', source: '타이탄', capture: false }),
      alertText: {
        en: 'Landslide: In Front',
        de: 'Armberge: Vor ihm',
        fr: 'Devant',
        ja: 'ランスラ: 正面へ',
        cn: '面前躲避',
        ko: '완갑: 정면',
      },
    },
    {
      id: 'E4S Massive Landslide - Sides',
      regex: Regexes.ability({ id: '4117', source: 'Titan', capture: false }),
      regexDe: Regexes.ability({ id: '4117', source: 'Titan', capture: false }),
      regexFr: Regexes.ability({ id: '4117', source: 'Titan', capture: false }),
      regexJa: Regexes.ability({ id: '4117', source: 'タイタン', capture: false }),
      regexCn: Regexes.ability({ id: '4117', source: '泰坦', capture: false }),
      regexKo: Regexes.ability({ id: '4117', source: '타이탄', capture: false }),
      infoText: {
        en: 'Get to Sides',
        de: 'Zur Seite',
        fr: 'Sur les côtés',
        ja: '横へ',
        cn: '两侧躲避',
        ko: '양옆으로',
      },
    },
    {
      id: 'E4S Landslide',
      regex: / 14:411A:Titan starts using Landslide/,
      regexCn: / 14:411A:泰坦 starts using 地裂/,
      regexDe: / 14:411A:Titan starts using Bergsturz/,
      regexFr: / 14:411A:Titan starts using Glissement De Terrain/,
      regexJa: / 14:411A:タイタン starts using ランドスライド/,
      regexKo: / 14:411A:타이탄 starts using 산사태/,
      alertText: {
        en: 'Back Corners',
        de: 'Hintere Ecken',
        fr: 'Coins arrière',
        ja: 'ランスラくるよ',
        cn: '后方角落',
        ko: '뒤쪽 구석으로',
      },
    },
    {
      id: 'E4S Crumbling Down',
      regex: Regexes.headMarker({ id: '0017' }),
      condition: function(data, matches) {
        return data.me == matches.target;
      },
      alertText: {
        en: 'Bomb on YOU',
        de: 'Bombe auf DIR',
        fr: 'Bombe sur VOUS',
        ja: 'マーカーついた',
        cn: '炸弹点名',
        ko: '거리감쇠 징 대상자',
      },
    },
    {
      // Bomb positions are all x = (86 west, 100 mid, 114 east), y = (86, 100, 114).
      // Note: as these may hit multiple people, there may be multiple lines for the same bomb.
      id: 'E4S Bury Directions',
      regex: Regexes.abilityFull({ id: '4142', source: 'Bomb Boulder' }),
      regexDe: Regexes.abilityFull({ id: '4142', source: 'Bomber-Brocken' }),
      regexFr: Regexes.abilityFull({ id: '4142', source: 'Bombo Rocher' }),
      regexJa: Regexes.abilityFull({ id: '4142', source: 'ボムボルダー' }),
      regexCn: Regexes.abilityFull({ id: '4142', source: '爆破岩石' }),
      regexKo: Regexes.abilityFull({ id: '4142', source: '바위폭탄' }),
      condition: function(data) {
        return !data.printedBury;
      },
      durationSeconds: 7,
      alertText: function(data, matches) {
        let x = matches.x;
        let y = matches.y;

        if (data.phase == 'armor') {
          // Three line bombs (middle, e/w, w/e), with seismic wave.
          if (x < 95) {
            data.printedBury = true;
            return {
              en: 'Hide Behind East',
              de: 'Im Osten vestecken',
              fr: 'Cachez-vous derrière à l\'est',
              cn: '右边躲避',
              ko: '동쪽으로',
            };
          } else if (x > 105) {
            data.printedBury = true;
            return {
              en: 'Hide Behind West',
              de: 'Im Westen vestecken',
              fr: 'Cachez-vous derrière à l\'ouest',
              cn: '左边躲避',
              ko: '서쪽으로',
            };
          }
        } else if (data.phase == 'landslide') {
          // Landslide cardinals/corners + middle, followed by remaining 4.
          let xMiddle = x < 105 && x > 95;
          let yMiddle = y < 105 && y > 95;
          // Ignore middle point, which may come first.
          if (xMiddle && yMiddle)
            return;

          data.printedBury = true;
          if (!xMiddle && !yMiddle) {
            // Corners dropped first.  Cardinals safe.
            return {
              en: 'Go Cardinals First',
              de: 'Zuerst zu den Seiten gehen',
              fr: 'Allez aux cardinaux en premier',
              ja: '十字',
              cn: '十字',
              ko: '먼저 측면으로 이동',
            };
          }
          // Cardinals dropped first.  Corners safe.
          return {
            en: 'Go Corners First',
            de: 'Zuerst in die Ecken gehen',
            fr: 'Allez dans les coins en premier',
            cn: '先去角落',
            ko: '먼저 코너로 이동',
          };
        }
      },
    },
    {
      id: 'E4S Fault Line - Sides',
      regex: Regexes.ability({ id: '40E8', source: 'Titan', capture: false }),
      regexDe: Regexes.ability({ id: '40E8', source: 'Titan', capture: false }),
      regexFr: Regexes.ability({ id: '40E8', source: 'Titan', capture: false }),
      regexJa: Regexes.ability({ id: '40E8', source: 'タイタン', capture: false }),
      regexCn: Regexes.ability({ id: '40E8', source: '泰坦', capture: false }),
      regexKo: Regexes.ability({ id: '40E8', source: '타이탄', capture: false }),
      alertText: {
        en: 'Wheels: On Sides',
        de: 'Räder: Zur Seite',
        fr: 'Roues : Sur les côtés',
        ja: '車輪: 横へ',
        cn: '车轮：两侧',
        ko: '바퀴: 옆으로',
      },
    },
    {
      id: 'E4S Fault Line - Front',
      regex: Regexes.ability({ id: '411F', source: 'Titan', capture: false }),
      regexDe: Regexes.ability({ id: '411F', source: 'Titan', capture: false }),
      regexFr: Regexes.ability({ id: '411F', source: 'Titan', capture: false }),
      regexJa: Regexes.ability({ id: '411F', source: 'タイタン', capture: false }),
      regexCn: Regexes.ability({ id: '411F', source: '泰坦', capture: false }),
      regexKo: Regexes.ability({ id: '411F', source: '타이탄', capture: false }),
      infoText: {
        en: 'Tank Charge',
        de: 'Tank wird angefahren',
        fr: 'Charge tank',
        ja: 'タンクに突進',
        cn: '坦克冲锋',
        ko: '탱 돌진',
      },
    },
    {
      id: 'E4S Magnitude 5.0',
      regex: / 14:4121:Titan starts using Magnitude 5.0/,
      regexCn: / 14:4121:泰坦 starts using 震级5.0/,
      regexDe: / 14:4121:Titan starts using Magnitude 5.0/,
      regexFr: / 14:4121:Titan starts using Magnitude 5/,
      regexJa: / 14:4121:タイタン starts using マグニチュード5.0/,
      regexKo: / 14:4121:타이탄 starts using 진도 5.0/,
      alertText: {
        en: 'Get Under',
        de: 'Unter ihn',
        fr: 'Sous le boss',
        ja: '中へ',
        cn: '脚下集合',
        ko: '보스 아래로',
      },
    },
    {
      id: 'E4S Earthen Fury',
      regex: / 14:4124:Titan Maximum starts using Earthen Fury/,
      regexCn: / 14:4124:极大泰坦 starts using 大地之怒/,
      regexDe: / 14:4124:Gigantitan starts using Gaias Zorn/,
      regexFr: / 14:4124:Maxi Titan starts using Fureur Tellurique/,
      regexJa: / 14:4124:マキシタイタン starts using 大地の怒り/,
      regexKo: / 14:4124:타이탄 Maximum starts using 대지의 분노/,
      condition: function(data) {
        return data.role == 'healer';
      },
      infoText: {
        en: 'Big aoe',
        de: 'Große AoE',
        fr: 'Gros dégâts de zone',
        ja: '強AoE',
        cn: '大AOE',
        ko: '강한 전체 공격',
      },
    },
    {
      id: 'E4S Earthen Fist - Left/Right',
      regex: / 14:412F:Titan Maximum starts using Earthen Fist/,
      regexCn: / 14:412F:极大泰坦 starts using 大地之拳/,
      regexDe: / 14:412F:Gigantitan starts using Gaias Faust/,
      regexFr: / 14:412F:Maxi Titan starts using Poing De La Terre/,
      regexJa: / 14:412F:マキシタイタン starts using 大地の拳/,
      regexKo: / 14:412F:타이탄 Maximum starts using 대지의 주먹/, // 한자 번역 - 아래도
      infoText: {
        en: 'Left, Then Right',
        de: 'Links, dann Rechts',
        fr: 'Gauche puis droite',
        ja: '左 => 右',
        cn: '左 => 右',
        ko: '왼쪽 => 오른쪽',
      },
    },
    {
      id: 'E4S Earthen Fist - Right/Left',
      regex: / 14:4130:Titan Maximum starts using Earthen Fist/,
      regexCn: / 14:4130:极大泰坦 starts using 大地之拳/,
      regexDe: / 14:4130:Gigantitan starts using Gaias Faust/,
      regexFr: / 14:4130:Maxi Titan starts using Poing De La Terre/,
      regexJa: / 14:4130:マキシタイタン starts using 大地の拳/,
      regexKo: / 14:4130:타이탄 Maximum starts using 대지의 주먹/,
      infoText: {
        en: 'Right, Then Left',
        de: 'Rechts, dann Links',
        fr: 'Droite puis gauche',
        ja: '右 => 左',
        cn: '右 => 左',
        ko: '오른쪽 => 왼쪽',
      },
    },
    {
      id: 'E4S Earthen Fist - 2x Left',
      regex: / 14:4131:Titan Maximum starts using Earthen Fist/,
      regexCn: / 14:4131:极大泰坦 starts using 大地之拳/,
      regexDe: / 14:4131:Gigantitan starts using Gaias Faust/,
      regexFr: / 14:4131:Maxi Titan starts using Poing De La Terre/,
      regexJa: / 14:4131:マキシタイタン starts using 大地の拳/,
      regexKo: / 14:4131:타이탄 Maximum starts using 대지의 주먹/,
      infoText: {
        en: 'Left, Stay Left',
        de: 'Links, Links bleiben',
        fr: 'Gauche puis restez',
        ja: 'ずっと左',
        cn: '一直在左',
        ko: ' 왼쪽 => 왼쪽',
      },
    },
    {
      id: 'E4S Earthen Fist - 2x Right',
      regex: / 14:4132:Titan Maximum starts using Earthen Fist/,
      regexCn: / 14:4132:极大泰坦 starts using 大地之拳/,
      regexDe: / 14:4132:Gigantitan starts using Gaias Faust/,
      regexFr: / 14:4132:Maxi Titan starts using Poing De La Terre/,
      regexJa: / 14:4132:マキシタイタン starts using 大地の拳/,
      regexKo: / 14:4132:타이탄 Maximum starts using 대지의 주먹/,
      infoText: {
        en: 'Right, Stay Right',
        de: 'Rechts, Rechts bleiben',
        fr: 'Droite puis restez',
        ja: 'ずっと右',
        cn: '一直在右',
        ko: '오른쪽 => 오른쪽',
      },
    },
    {
      id: 'E4S Dual Earthen Fists',
      regex: / 14:4135:Titan Maximum starts using Dual Earthen Fists/,
      regexCn: / 14:4135:极大泰坦 starts using 大地之双拳/,
      regexDe: / 14:4135:Gigantitan starts using Gaias Hammerfaust/,
      regexFr: / 14:4135:Maxi Titan starts using Frappe De La Terre/,
      regexJa: / 14:4135:マキシタイタン starts using 大地の両拳/,
      regexKo: / 14:4135:타이탄 Maximum starts using Dual Earthen Fists/,
      infoText: {
        en: 'Knockback',
        de: 'Rückstoß',
        fr: 'Poussée',
        ja: 'ノックバック',
        cn: '击退',
        ko: '넉백',
      },
    },
    {
      id: 'E4S Weight of the World',
      regex: Regexes.headMarker({ id: '00BB' }),
      condition: function(data, matches) {
        return data.me == matches.target;
      },
      alertText: {
        en: 'Weight, Get Out',
        ja: '青: 離れて',
        de: 'Schwere, Raus gehen',
        fr: 'Poids, éloignez-vous',
        cn: '蓝色：离开人群',
        ko: '파랑징, 피하기',
      },
    },
    {
      id: 'E4S Megalith',
      regex: Regexes.headMarker({ id: '005D' }),
      alertText: function(data, matches) {
        if (data.role != 'tank') {
          return {
            en: 'Away from Tanks',
            ja: 'タンクから離れて',
            de: 'Weg von den Tanks',
            fr: 'Loin des tanks',
            cn: '远离坦克',
            ko: '탱커에서 멀어지기',
          };
        }
        if (matches.target == data.me) {
          return {
            en: 'Stack on YOU',
            ja: '自分にシェア',
            de: 'Auf DIR sammeln',
            fr: 'Package sur VOUS',
            cn: '集合分摊',
            ko: '쉐어징 대상자',
          };
        }
        return {
          en: 'Stack on ' + data.ShortName(matches.target),
          ja: data.ShortName(matches.target) + 'にシェア',
          de: 'Auf ' + data.ShortName(matches.target) + ' sammeln',
          fr: 'Package sur ' + data.ShortName(matches.target),
          cn: '集合 ->' + data.ShortName(matches.target),
          ko: '"' + data.ShortName(matches.target) + '" 쉐어징',
        };
      },
    },
    {
      id: 'E4S Granite Gaol',
      regex: Regexes.headMarker({ id: '00BF' }),
      condition: function(data, matches) {
        return data.me == matches.target;
      },
      alertText: {
        en: 'Gaol on YOU',
        ja: '自分にジェイル',
        de: 'Gefängnis auf DIR',
        fr: 'Geôle sur VOUS',
        cn: '石牢点名',
        ko: '화강암 감옥 대상',
      },
    },
    {
      // TODO: these could be better called out
      // On the first set, maybe should tell you where to put the jails,
      // if it's a consistent strategy to ranged lb the jails.  After that
      // it could just tell you to "go right" or "go left".
      // On the second set, could just say "go right" / "go front" and
      // keep track of which it has seen.
      id: 'E4S Plate Fracture - Front Right',
      regex: / 14:4125:Titan Maximum starts using Plate Fracture/,
      regexCn: / 14:4125:极大泰坦 starts using 岩盘粉碎/,
      regexDe: / 14:4125:Gigantitan starts using Felsberster/,
      regexFr: / 14:4125:Maxi Titan starts using Fracture Rocheuse/,
      regexJa: / 14:4125:マキシタイタン starts using ロックフラクチャー/,
      regexKo: / 14:4125:타이탄 Maximum starts using Plate Fracture/, // 타이탄 Maximum 번역 필요 - 아래도
      infoText: {
        en: 'GET OFF FRONT RIGHT',
        de: 'VON VORNE RECHTS RUNTER',
        fr: 'PARTEZ DE L\'AVANT DROITE',
        ja: '右前壊れるよ',
        cn: '破坏右前',
        ko: '앞 오른쪽 피하기',
      },
    },
    {
      id: 'E4S Plate Fracture - Back Right',
      regex: / 14:4126:Titan Maximum starts using Plate Fracture/,
      regexCn: / 14:4126:极大泰坦 starts using 岩盘粉碎/,
      regexDe: / 14:4126:Gigantitan starts using Felsberster/,
      regexFr: / 14:4126:Maxi Titan starts using Fracture Rocheuse/,
      regexJa: / 14:4126:マキシタイタン starts using ロックフラクチャー/,
      regexKo: / 14:4126:타이탄 Maximum starts using Plate Fracture/,
      infoText: {
        en: 'GET OFF BACK RIGHT',
        de: 'VON HINTEN RECHTS RUNTER',
        fr: 'PARTEZ DE L\'ARRIERE DROITE',
        ja: '右後ろ壊れるよ',
        cn: '破坏右后',
        ko: '뒤 오른쪽 피하기',
      },
    },
    {
      id: 'E4S Plate Fracture - Back Left',
      regex: / 14:4127:Titan Maximum starts using Plate Fracture/,
      regexCn: / 14:4127:极大泰坦 starts using 岩盘粉碎/,
      regexDe: / 14:4127:Gigantitan starts using Felsberster/,
      regexFr: / 14:4127:Maxi Titan starts using Fracture Rocheuse/,
      regexJa: / 14:4127:マキシタイタン starts using ロックフラクチャー/,
      regexKo: / 14:4127:타이탄 Maximum starts using Plate Fracture/,
      infoText: {
        en: 'GET OFF BACK LEFT',
        de: 'VON HINTEN LINKS RUNTER',
        fr: 'PARTEZ DE L\'ARRIERE GAUCHE',
        ja: '左後ろ壊れるよ',
        cn: '破坏左后',
        ko: '뒤 왼쪽 피하기',
      },
    },
    {
      id: 'E4S Plate Fracture - Front Left',
      regex: / 14:4128:Titan Maximum starts using Plate Fracture/,
      regexCn: / 14:4128:极大泰坦 starts using 岩盘粉碎/,
      regexDe: / 14:4128:Gigantitan starts using Felsberster/,
      regexFr: / 14:4128:Maxi Titan starts using Fracture Rocheuse/,
      regexJa: / 14:4128:マキシタイタン starts using ロックフラクチャー/,
      regexKo: / 14:4128:타이탄 Maximum starts using Plate Fracture/,
      infoText: {
        en: 'GET OFF FRONT LEFT',
        de: 'VON VORNE LINKS RUNTER',
        fr: 'PARTEZ DE L\'AVANT GAUCHE',
        ja: '左前壊れるよ',
        cn: '破坏左前',
        ko: '앞 왼쪽 피하기',
      },
    },
    {
      id: 'E4S Tumult',
      regex: / 14:412A:Titan Maximum starts using Tumult/,
      regexCn: / 14:412A:极大泰坦 starts using 怒震/,
      regexDe: / 14:412A:Gigantitan starts using Katastrophales Beben/,
      regexFr: / 14:412A:Maxi Titan starts using Tumulte/,
      regexJa: / 14:412A:マキシタイタン starts using 激震/,
      regexKo: / 14:412A:타이탄 Maximum starts using 격진/, // 한자 번역 - 아래도
      condition: function(data) {
        return data.role == 'healer';
      },
      infoText: {
        en: 'aoe',
        ja: '激震',
        de: 'AoE',
        fr: 'Dégâts de zone',
        cn: 'AOE',
        ko: '전체 공격 5회',
      },
    },
  ],
  timelineReplace: [
    {
      'locale': 'de',
      'replaceSync': {
        'Titan': 'Titan',
        'Granite Gaol': 'Granitgefängnis',
        'Engage!': 'Start!',
        'Bomb Boulder': 'Bomber-Brocken',
      },
      'replaceText': {
        'Dual Earthen Fists': 'Gaias Hammerfaust',
        'attack': 'Attacke',
        'Weight of the World': 'Schwere der Erde',
        'Weight of the Land': 'Gaias Gewicht',
        'Voice of the Land': 'Aufschrei der Erde',
        'Unknown Ability': 'Unknown Ability',
        'Tumult': 'Katastrophales Beben',
        'Tectonic Uplift': 'Tektonische Hebung',
        'Stonecrusher': 'Felsbrecher',
        'Seismic Wave': 'Seismische Welle',
        'Rock Throw': 'Granitgefängnis',
        'Rightward Landslide': 'Rechter Bergsturz',
        'Pulse of the Land': 'Gaias Beben',
        'Plate Fracture': 'Felsberster',
        'Orogenesis': 'Orogenese',
        'Megalith': 'Megalithenbrecher',
        'Massive Landslide': 'Gigantischer Bergsturz',
        'Magnitude 5.0': 'Magnitude 5.0',
        'Landslide': 'Bergsturz',
        'Geocrush': 'Kraterschlag',
        'Force of the Land': 'Gaias Tosen',
        'Fault Line': 'Bruchlinie',
        'Explosion': 'Explosion',
        'Evil Earth': 'Grimm der Erde',
        'Enrage': 'Finalangriff',
        'Earthen Wheels': 'Gaia-Räder',
        'Earthen Gauntlets': 'Gaia-Armberge',
        'Earthen Fury': 'Gaias Zorn',
        'Earthen Fist': 'Gaias Faust',
        'Earthen Armor': 'Basaltpanzer',
        'Earthen Anguish': 'Gaias Pein',
        'Crumbling Down': 'Felsfall',
        'Bury': 'Begraben',
        'Bomb Boulders': 'Tumulus',
        'Aftershock': 'Nachbeben',
        '--untargetable--': '--nich anvisierbar--',
        '--targetable--': '--anvisierbar--',
      },
      '~effectNames': {
        'Summon Order III': 'Egi-Attacke III',
        'Summon Order': 'Egi-Attacke I',
        'Physical Vulnerability Up': 'Erhöhte Physische Verwundbarkeit',
        'Magic Vulnerability Up': 'Erhöhte Magie-Verwundbarkeit',
        'Healing Magic Down': 'Heilmagie -',
        'Filthy': 'Dreck',
        'Fetters': 'Gefesselt',
        'Devotion': 'Hingabe',
        'Damage Down': 'Schaden -',
      },
    },
    {
      'locale': 'fr',
      'replaceSync': {
        'Titan': 'Titan',
        'Granite Gaol': 'Geôle De Granite',
        'Engage!': 'À l\'attaque',
        'Bomb Boulder': 'Bombo Rocher',
      },
      'replaceText': {
        'attack': 'Attaque',
        'Weight of the World': 'Poids du monde',
        'Weight of the Land': 'Poids de la terre',
        'Voice of the Land': 'Hurlement tellurique',
        'Unknown Ability': 'Unknown Ability',
        'Tumult': 'Tumulte',
        'Tectonic Uplift': 'Soulèvement tectonique',
        'Stonecrusher': 'Éruption tellurique',
        'Seismic Wave': 'Ondes sismiques',
        'Rock Throw': 'Jeté de rocs',
        'Rightward Landslide': 'Glissement dextre',
        'Pulse of the Land': 'Vibration tellurique',
        'Plate Fracture': 'Fracture rocheuse',
        'Orogenesis': 'Orogenèse',
        'Megalith': 'Écrasement mégalithique',
        'Massive Landslide': 'Glissement apocalyptique',
        'Magnitude 5.0': 'Magnitude 5',
        'Landslide': 'Glissement de terrain',
        'Geocrush': 'Broie-terre',
        'Force of the Land': 'Grondement tellurique',
        'Fault Line': 'Faille tectonique',
        'Explosion': 'Explosion',
        'Evil Earth': 'Terre maléfique',
        'Enrage': 'Enrage',
        'Earthen Wheels': 'Pas tellurique',
        'Earthen Gauntlets': 'Poing tellurique',
        'Earthen Fury': 'Fureur tellurique',
        'Earthen Fist': 'Poing de la terre',
        'Earthen Armor': 'Armure tellurique',
        'Earthen Anguish': 'Peine de la terre',
        'Dual Earthen Fists': 'Frappe de la terre',
        'Crumbling Down': 'Chute de monolithes',
        'Bury': 'Ensevelissement',
        'Bomb Boulders': 'Bombo rocher',
        'Aftershock': 'Répercussion',
        '--untargetable--': '--Impossible à cibler--',
        '--targetable--': '--Ciblable--',
        '--sync--': '--Synchronisation--',
        '--Reset--': '--Réinitialisation--',
      },
      '~effectNames': {
        'Summon Order III': 'Actions en attente: 3',
        'Summon Order': 'Action en attente: 1',
        'Physical Vulnerability Up': 'Vulnérabilité Physique Augmentée',
        'Magic Vulnerability Up': 'Vulnérabilité Magique Augmentée',
        'Healing Magic Down': 'Malus De Soin',
        'Filthy': 'Embourbement',
        'Fetters': 'Attache',
        'Devotion': 'Dévouement',
        'Damage Down': 'Malus De Dégâts',
      },
    },
    {
      'locale': 'ja',
      'replaceSync': {
        'ジャイアントボルダー': 'ジャイアントボルダー',
        'Titan': 'タイタン',
        'Granite Gaol': 'グラナイト・ジェイル',
        'Engage!': '戦闘開始！',
        'Bomb Boulder': 'ボムボルダー',
        'Titan Maximum': 'マキシタイタン',
      },
      'replaceText': {
        'attack': '攻撃',
        'Weight of the World': '大陸の重み',
        'Weight of the Land': '大地の重み',
        'Voice of the Land': '大地の叫び',
        'Unknown Ability': 'Unknown Ability',
        'Tumult': '激震',
        'Tectonic Uplift': 'クラスタルアップリフト',
        'Stonecrusher': 'ロッククラッシュ',
        'Seismic Wave': 'サイズミックウェーブ',
        'Rock Throw': 'グラナイト・ジェイル',
        'Rightward Landslide': 'ライト・ランドスライド',
        'Pulse of the Land': '大地の響き',
        'Plate Fracture': 'ロックフラクチャー',
        'Orogenesis': 'オーロジェニー',
        'Megalith': 'メガリスクラッシュ',
        'Massive Landslide': 'メガ・ランドスライド',
        'Magnitude 5.0': 'マグニチュード5.0',
        'Landslide': 'ランドスライド',
        'Geocrush': 'ジオクラッシュ',
        'Force of the Land': '大地の轟き',
        'Fault Line': 'フォールトゾーン',
        'Explosion': '爆散',
        'Evil Earth': 'イビルアース',
        'Earthen Wheels': '大地の車輪',
        'Earthen Gauntlets': '大地の手甲',
        'Earthen Fury': '大地の怒り',
        'Earthen Fist': '大地の拳',
        'Earthen Armor': '大地の鎧',
        'Earthen Anguish': '大地の痛み',
        'Dual Earthen Fists': '大地の両拳',
        'Crumbling Down': '岩盤崩落',
        'Bury': '衝撃',
        'Bomb Boulders': 'ボムボルダー',
        'Aftershock': '余波',
      },
      '~effectNames': {
        'Summon Order III': 'アクション実行待機III',
        'Summon Order': 'アクション実行待機I',
        'Physical Vulnerability Up': '被物理ダメージ増加',
        'Magic Vulnerability Up': '被魔法ダメージ増加',
        'Healing Magic Down': '回復魔法効果低下',
        'Filthy': '汚泥',
        'Fetters': '拘束',
        'Devotion': 'エギの加護',
        'Damage Down': 'ダメージ低下',
      },
    },
    {
      'locale': 'cn',
      'replaceSync': {
        'Titan Maximum': '极大泰坦',
        'Titan': '泰坦',
        'Granite Gaol': '花岗石牢',
        'Engage!': '战斗开始！',
        'Bomb Boulder': '爆破岩石',
      },
      'replaceText': {
        'attack': '攻击',
        'Weight of the World': '铁球',
        'Weight [Oo]f [Tt]he Land': '大地之重',
        'Weight of the Land': '大地之重',
        'Voice [Oo]f [Tt]he Land': '大地之号',
        'Voice of the Land': '大地之号',
        'Tumult': '怒震',
        'Tectonic Uplift': '地壳上升',
        'Stonecrusher': '崩岩',
        'Seismic Wave': '地震波',
        'Rock Throw': '花岗岩牢狱',
        'Rightward Landslide': '右侧地裂',
        'Pulse of the Land': '大地之响',
        'Plate Fracture': '岩盘粉碎',
        'Orogenesis': '造山',
        'Megalith': '巨石',
        'Massive Landslide': '百万地裂',
        'Magnitude 5.0': '震级5.0',
        'Right/Left Landslide': '右/左地裂',
        'Landslide': '地裂',
        'Geocrush': '大地粉碎',
        'Force of the Land': '大地之轰',
        'Fault Line': '断裂带',
        'Explosion': '爆炸',
        'Evil Earth': '邪土',
        'Earthen Wheels': '大地之车轮',
        'Earthen Gauntlets': '大地之手甲',
        'Earthen Fury Enrage': '大地之怒 狂暴',
        'Earthen Fury': '大地之怒',
        'Dual Earthen Fists': '大地之双拳',
        'Earthen Fist': '大地之拳',
        'Earthen Armor': '大地之铠',
        'Earthen Anguish': '大地之痛',
        'Crumbling Down': '岩层崩落',
        'Bury': '塌方',
        'Bomb Boulders': '爆破岩石',
        'Aftershock': '余波',
        '--targetable--': '--可选中--',
        '--untargetable--': '--无法选中--',
      },
      '~effectNames': {
        'Summon Order III': '发动技能待命III',
        'Summon Order': '发动技能待命I',
        'Physical Vulnerability Up': '物理受伤加重',
        'Magic Vulnerability Up': '魔法受伤加重',
        'Healing Magic Down': '治疗魔法效果降低',
        'Filthy': '污泥',
        'Fetters': '拘束',
        'Devotion': '灵护',
        'Damage Down': '伤害降低',
      },
    },
    {
      'locale': 'ko',
      'replaceSync': {
        'Titan': '타이탄',
        'Granite Gaol': '화강암 감옥',
        'Engage!': '전투 시작!',
        'Bomb Boulder': '바위폭탄',
      },
      'replaceText': {
        'Dual Earthen Fists': 'Dual Earthen Fists',
        'attack': '공격',
        'Weight of the World': 'Weight of the World',
        'Weight of the Land': '대지의 무게',
        'Voice of the Land': '대지의 외침',
        'Tumult': '격진',
        'Tectonic Uplift': 'Tectonic Uplift',
        'Stonecrusher': '암석 붕괴',
        'Seismic Wave': '지진파',
        'Rock Throw': 'Rock Throw',
        'Rightward Landslide': '우측 산사태',
        'Pulse of the Land': 'Pulse of the Land',
        'Plate Fracture': 'Plate Fracture',
        'Orogenesis': 'Orogenesis',
        'Megalith': 'Megalith',
        'Massive Landslide': '대규모 산사태',
        'Magnitude 5.0': '진도 5.0',
        'Landslide': '산사태',
        'Geocrush': '대지 붕괴',
        'Force of the Land': 'Force of the Land',
        'Fault Line': '단층선',
        'Explosion': '폭산',
        'Evil Earth': '사악한 대지',
        'Enrage': '전멸기',
        'Earthen Wheels': '대지의 바퀴',
        'Earthen Gauntlets': '대지의 완갑',
        'Earthen Fury': '대지의 분노',
        'Earthen Fist': '대지의 주먹',
        'Earthen Armor': '대지의 갑옷',
        'Earthen Anguish': 'Earthen Anguish',
        'Crumbling Down': '암반 낙하',
        'Bury': '충격',
        'Bomb Boulders': '바위폭탄',
        'Aftershock': '여파',
        '--untargetable--': '--타겟불가능--',
        '--targetable--': '--타겟가능--',
      },
      '~effectNames': {
        'Summon Order III': '기술 실행 대기 3',
        'Summon Order': '기술 실행 대기 1',
        'Physical Vulnerability Up': '받는 물리 피해량 증가',
        'Magic Vulnerability Up': '받는 마법 피해량 증가',
        'Healing Magic Down': '회복마법 효과 감소',
        'Filthy': '진흙탕',
        'Fetters': '구속',
        'Devotion': '에기의 가호',
        'Damage Down': '주는 피해량 감소',
      },
    },
  ],
}];
