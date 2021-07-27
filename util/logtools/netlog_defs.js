// canAnonymize: boolean whether this line can be anonymized
// playerIds: map of indexes from a player id to the index of that player name
// isUnknown: needs more information, never seen this log
// optionalFields: a list of fields that are ok to not appear (or have invalid ids)
// firstUnknownField: fields at this index and beyond are cleared, when anonymizing
// globalInclude: include all of these lines in any split
// lastInclude: include the last line of this type in any split

// TODO: build NetRegexes out of this, or somehow deduplicate.
const logDefinitions = {
  '00': {
    type: 'LogLine',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'code',
      3: 'name',
      4: 'line',
    },
    subFields: {
      code: {
        '0039': {
          type: 'message',
          canAnonymize: true,
        },
        '0038': {
          type: 'echo',
          canAnonymize: true,
        },
        '0044': {
          type: 'dialog',
          canAnonymize: true,
        },
        '0839': {
          type: 'message',
          canAnonymize: true,
        },
      },
    },
  },
  '01': {
    type: 'ChangeZone',
    lastInclude: true,
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'id',
      3: 'name',
    },
    canAnonymize: true,
  },
  '02': {
    type: 'ChangePrimaryPlayer',
    lastInclude: true,
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'id',
      3: 'name',
    },
    playerIds: {
      2: 3,
    },
    canAnonymize: true,
  },
  '03': {
    type: 'AddCombatant',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'id',
      3: 'name',
      4: 'job',
      5: 'level',
      6: 'owner',
      8: 'world',
      9: 'npcNameId',
      10: 'npcBaseId',
      12: 'hp',
      17: 'x',
      18: 'y',
      19: 'z',
      20: 'heading',
    },
    playerIds: {
      2: 3,
      6: null,
    },
    canAnonymize: true,
  },
  '04': {
    type: 'RemoveCombatant',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'id',
      3: 'name',
      4: 'job',
      5: 'level',
      6: 'owner',
      8: 'world',
      9: 'npcNameId',
      10: 'npcBaseId',
      12: 'hp',
      17: 'x',
      18: 'y',
      19: 'z',
      20: 'heading',
    },
    playerIds: {
      2: 3,
      6: null,
    },
    canAnonymize: true,
  },
  '05': {
    type: 'AddBuff',
    isUnknown: true,
  },
  '06': {
    type: 'RemoveBuff',
    isUnknown: true,
  },
  '07': {
    type: 'FlyingText',
    isUnknown: true,
  },
  '08': {
    type: 'OutgoingAbility',
    isUnknown: true,
  },
  '10': {
    type: 'IncomingAbility',
    isUnknown: true,
  },
  '11': {
    type: 'PartyList',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'partyCount',
      3: 'id0',
      4: 'id1',
      5: 'id2',
      6: 'id3',
      7: 'id4',
      8: 'id5',
      9: 'id6',
      10: 'id7',
      11: 'id8',
      12: 'id9',
      13: 'id10',
      14: 'id11',
      15: 'id12',
      16: 'id13',
      17: 'id14',
      18: 'id15',
      19: 'id16',
      20: 'id17',
      21: 'id18',
      22: 'id19',
      23: 'id20',
      24: 'id21',
      25: 'id22',
      26: 'id23',
    },
    playerIds: {
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
      9: null,
      10: null,
      11: null,
      12: null,
      13: null,
      14: null,
      15: null,
      16: null,
      17: null,
      18: null,
      19: null,
      20: null,
      21: null,
      22: null,
      23: null,
      24: null,
      25: null,
      26: null,
    },
    optionalFields: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
      16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
    canAnonymize: true,
    lastInclude: true,
  },
  '12': {
    type: 'PlayerStats',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'job',
      3: 'strength',
      4: 'dexterity',
      5: 'vitality',
      6: 'intelligence',
      7: 'mind',
      8: 'piety',
      9: 'attackPower',
      10: 'directHit',
      11: 'criticalHit',
      12: 'attackMagicPotency',
      13: 'healMagicPotency',
      14: 'determination',
      15: 'skillSpeed',
      16: 'spellSpeed',
      18: 'tenacity',
    },
    canAnonymize: true,
    lastInclude: true,
  },
  '13': {
    type: 'CombatantHP',
    isUnknown: true,
  },
  '20': {
    type: 'NetworkStartsCasting',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'sourceId',
      3: 'source',
      4: 'id',
      5: 'ability',
      6: 'targetId',
      7: 'target',
      8: 'castTime',
      9: 'x',
      10: 'y',
      11: 'z',
      12: 'heading',
    },
    optionalFields: [6],
    playerIds: {
      2: 3,
      6: 7,
    },
    canAnonymize: true,
  },
  '21': {
    type: 'NetworkAbility',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'sourceId',
      3: 'source',
      4: 'id',
      5: 'ability',
      6: 'targetId',
      7: 'target',
      8: 'flags',
      40: 'x',
      41: 'y',
      42: 'z',
      43: 'heading',
    },
    playerIds: {
      2: 3,
      6: 7,
    },
    optionalFields: [6],
    firstUnknownField: 44,
    canAnonymize: true,
  },
  '22': {
    type: 'NetworkAOEAbility',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'sourceId',
      3: 'source',
      4: 'id',
      5: 'ability',
      6: 'targetId',
      7: 'target',
      8: 'flags',
      40: 'x',
      41: 'y',
      42: 'z',
      43: 'heading',
    },
    playerIds: {
      2: 3,
      6: 7,
    },
    optionalFields: [6],
    firstUnknownField: 44,
    canAnonymize: true,
  },
  '23': {
    type: 'NetworkCancelAbility',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'id',
      3: 'name',
    },
    playerIds: {
      2: 3,
    },
    canAnonymize: true,
  },
  '24': {
    type: 'NetworkDoT',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'id',
      3: 'name',
    },
    playerIds: {
      2: 3,
    },
    canAnonymize: true,
  },
  '25': {
    type: 'NetworkDeath',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'targetId',
      3: 'target',
      4: 'sourceId',
      5: 'source',
    },
    playerIds: {
      2: 3,
      4: 5,
    },
    canAnonymize: true,
  },
  '26': {
    type: 'NetworkBuff',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'effectId',
      3: 'effect',
      4: 'duration',
      5: 'sourceId',
      6: 'source',
      7: 'targetId',
      8: 'target',
      9: 'count',
    },
    playerIds: {
      5: 6,
      7: 8,
    },
    canAnonymize: true,
  },
  '27': {
    type: 'NetworkTargetIcon',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'targetId',
      3: 'target',
      6: 'id',
    },
    playerIds: {
      2: 3,
    },
    canAnonymize: true,
  },
  '28': {
    type: 'NetworkRaidMarker',
    isUnknown: true,
  },
  '29': {
    type: 'NetworkTargetMarker',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'type', // Add, Update, Delete
      3: 'data',
      4: 'sourceId', // ?
      5: 'targetId', // ?
    },
    playerIds: {
      4: null,
      5: null,
    },
  },
  '30': {
    type: 'NetworkBuffRemove',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'effectId',
      3: 'effect',
      5: 'sourceId',
      6: 'source',
      7: 'targetId',
      8: 'target',
      9: 'count',
    },
    playerIds: {
      5: 6,
      7: 8,
    },
    canAnonymize: true,
  },
  '31': {
    type: 'NetworkGauge',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'id',
      3: 'data0',
      4: 'data1',
      5: 'data2',
      6: 'data3',
    },
    playerIds: {
      2: null,
    },
    // Sometimes this last field looks like a player id.
    // For safety, anonymize all of the gauge data.
    firstUnknownField: 3,
    canAnonymize: true,
  },
  '32': {
    type: 'NetworkWorld',
  },
  '33': {
    type: 'Network6D',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'data0',
      3: 'data1',
      4: 'data2',
      5: 'data3',
      6: 'data4',
      7: 'data5',
    },
    canAnonymize: true,
  },
  '34': {
    type: 'NetworkNameToggle',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'id',
      3: 'name',
      4: 'id',
      5: 'name',
    },
    playerIds: {
      2: 3,
      4: 5,
    },
    canAnonymize: true,
  },
  '35': {
    type: 'NetworkTether',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'sourceId',
      3: 'source',
      4: 'targetId',
      5: 'target',
      8: 'id',
    },
    playerIds: {
      2: 3,
      4: 5,
    },
    canAnonymize: true,
    firstUnknownField: 9,
  },
  '36': {
    type: 'LimitBreak',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'data0',
      3: 'data1',
    },
    canAnonymize: true,
  },
  '37': {
    type: 'NetworkEffectResult',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'id',
      3: 'name',
    },
    playerIds: {
      2: 3,
    },
    firstUnknownField: 22,
    canAnonymize: true,
  },
  '38': {
    type: 'NetworkStatusEffects',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'targetId',
      3: 'target',
      5: 'hp',
      6: 'maxHp',
      11: 'x',
      12: 'y',
      13: 'z',
      14: 'heading',
      15: 'data0',
      16: 'data1',
      17: 'data2',
      18: 'data3',
      19: 'data4',
    },
    playerIds: {
      2: 3,
    },
    firstUnknownField: 20,
    canAnonymize: true,
  },
  '39': {
    type: 'NetworkUpdateHP',
    fields: {
      0: 'logType',
      1: 'timestamp',
      2: 'id',
      3: 'name',
    },
    playerIds: {
      2: 3,
    },
    canAnonymize: true,
  },
  '249': {
    type: 'ParserInfo',
    globalInclude: true,
    canAnonymize: true,
  },
  '250': {
    type: 'ProcessInfo',
    globalInclude: true,
    canAnonymize: true,
  },
  '251': {
    type: 'Debug',
    globalInclude: true,
    canAnonymize: false,
  },
  '252': {
    type: 'PacketDump',
    canAnonymize: false,
  },
  '253': {
    type: 'Version',
    globalInclude: true,
    canAnonymize: true,
  },
  '254': {
    type: 'Error',
    canAnonymize: false,
  },
  '255': {
    type: 'Timer',
    isUnknown: true,
  },
};

export default logDefinitions;
