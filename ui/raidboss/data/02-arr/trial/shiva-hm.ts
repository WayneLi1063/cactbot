import Conditions from '../../../../../resources/conditions';
import { Responses } from '../../../../../resources/responses';
import ZoneId from '../../../../../resources/zone_id';
import { RaidbossData } from '../../../../../types/data';
import { TriggerSet } from '../../../../../types/trigger';

export type Data = RaidbossData;

// TODO: should the post-staff "spread" happen unconditionally prior to marker?

const triggerSet: TriggerSet<Data> = {
  zoneId: ZoneId.TheAkhAfahAmphitheatreHard,
  timelineFile: 'shiva-hm.txt',
  timelineTriggers: [
    {
      id: 'ShivaHm Absolute Zero',
      regex: /Absolute Zero/,
      beforeSeconds: 5,
      // These are usually doubled, so avoid spamming.
      suppressSeconds: 10,
      response: Responses.aoe(),
    },
    {
      id: 'ShivaHm Icebrand',
      regex: /Icebrand/,
      beforeSeconds: 5,
      response: Responses.tankCleave(),
    },
  ],
  triggers: [
    {
      id: 'ShivaHm Hailstorm Marker',
      type: 'HeadMarker',
      netRegex: { id: '001D' },
      condition: Conditions.targetIsYou(),
      response: Responses.spread('alert'),
    },
    {
      id: 'ShivaHm Glacier Bash',
      type: 'StartsUsing',
      netRegex: { id: '9A1', capture: false },
      response: Responses.getBehind('info'),
    },
    {
      id: 'ShivaHm Permafrost',
      type: 'StartsUsing',
      netRegex: { id: '999', capture: false },
      response: Responses.stopMoving('alert'),
    },
    {
      id: 'ShivaHm Ice Boulder',
      type: 'Ability',
      netRegex: { id: '9A3' },
      condition: Conditions.targetIsNotYou(),
      infoText: (data, matches, output) => output.text!({ player: data.ShortName(matches.target) }),
      outputStrings: {
        text: {
          en: 'Free ${player}',
          de: 'Befreie ${player}',
          fr: 'Libérez ${player}',
          ja: '${player}を救う',
          cn: '解救${player}',
          ko: '${player}감옥 해제',
        },
      },
    },
  ],
  timelineReplace: [
    {
      'locale': 'de',
      'replaceSync': {
        'Ice Soldier': 'Eissoldat',
        'Shiva': 'Shiva',
      },
      'replaceText': {
        '\\(circle\\)': '(Kreis)',
        '\\(cross\\)': '(Kreuz)',
        'Absolute Zero': 'Absoluter Nullpunkt',
        'Diamond Dust': 'Diamantenstaub',
        'Dreams Of Ice': 'Eisige Träume',
        'Frost Blade': 'Frostklinge',
        'Frost Staff': 'Froststab',
        'Glacier Bash': 'Gletscherlauf',
        'Hailstorm': 'Hagelsturm',
        'Heavenly Strike': 'Himmelszorn',
        'Icebrand': 'Eisbrand',
        'Icicle Impact': 'Eiszapfen-Schlag',
        'Melt': 'Schmelzen',
        'Permafrost': 'Permafrost',
      },
    },
    {
      'locale': 'fr',
      'replaceSync': {
        'Ice Soldier': 'soldat de glace',
        'Shiva': 'Shiva',
      },
      'replaceText': {
        '\\?': ' ?',
        '\\(circle\\)': '(cercle)',
        '\\(cross\\)': '(croix)',
        'Absolute Zero': 'Zéro absolu',
        'Diamond Dust': 'Poussière de diamant',
        'Dreams Of Ice': 'Illusions glacées',
        'Frost Blade': 'Lame glaciale',
        'Frost Staff': 'Bâton glacial',
        'Glacier Bash': 'Effondrement de glacier',
        'Hailstorm': 'Averse de grêle',
        'Heavenly Strike': 'Frappe céleste',
        'Icebrand': 'Épée de glace',
        'Icicle Impact': 'Impact de stalactite',
        'Melt': 'Fonte',
        'Permafrost': 'Permafrost',
      },
    },
    {
      'locale': 'ja',
      'replaceSync': {
        'Ice Soldier': 'アイスソルジャー',
        'Shiva': 'シヴァ',
      },
      'replaceText': {
        '\\(circle\\)': '(輪)',
        '\\(cross\\)': '(十字)',
        'Absolute Zero': '絶対零度',
        'Diamond Dust': 'ダイアモンドダスト',
        'Dreams Of Ice': '氷結の幻想',
        'Frost Blade': '凍てつく剣',
        'Frost Staff': '凍てつく杖',
        'Glacier Bash': 'グレイシャーバッシュ',
        'Hailstorm': 'ヘイルストーム',
        'Heavenly Strike': 'ヘヴンリーストライク',
        'Icebrand': 'アイスブランド',
        'Icicle Impact': 'アイシクルインパクト',
        'Melt': 'ウェポンメルト',
        'Permafrost': 'パーマフロスト',
      },
    },
    {
      'locale': 'cn',
      'replaceSync': {
        'Ice Soldier': '寒冰士兵',
        'Shiva': '希瓦',
      },
      'replaceText': {
        '\\(circle\\)': '(圆)',
        '\\(cross\\)': '(十字)',
        'Absolute Zero': '绝对零度',
        'Diamond Dust': '钻石星尘',
        'Dreams Of Ice': '寒冰的幻想',
        'Frost Blade': '冰霜之剑',
        'Frost Staff': '冰霜之杖',
        'Glacier Bash': '冰河怒击',
        'Hailstorm': '冰雹',
        'Heavenly Strike': '天降一击',
        'Icebrand': '冰印剑',
        'Icicle Impact': '冰柱冲击',
        'Melt': '武器融化',
        'Permafrost': '永久冻土',
      },
    },
    {
      'locale': 'ko',
      'replaceSync': {
        'Ice Soldier': '얼음 병사',
        'Shiva': '시바',
      },
      'replaceText': {
        '\\(circle\\)': '(원형)',
        '\\(cross\\)': '(십자)',
        'Absolute Zero': '절대영도',
        'Diamond Dust': '다이아몬드 더스트',
        'Dreams Of Ice': '빙결의 환상',
        'Frost Blade': '얼어붙은 검',
        'Frost Staff': '얼어붙은 지팡이',
        'Glacier Bash': '빙하 강타',
        'Hailstorm': '우박 폭풍',
        'Heavenly Strike': '천상의 일격',
        'Icebrand': '얼음의 낙인',
        'Icicle Impact': '고드름 낙하',
        'Melt': '무기 용해',
        'Permafrost': '영구동토',
      },
    },
  ],
};

export default triggerSet;
