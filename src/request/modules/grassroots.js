
import request from '../index'
import { urls } from '../urls'
import { getGlobalParams } from '@/utils/login'

export function findJourneyCoConstructionUnitPartyStatisticsPage (params) {
  return request({
    url: urls.findJourneyCoConstructionUnitPartyStatisticsPage,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function insertJourneyCoConstructionUnitPartyStatistics (params) {
  return request({
    url: urls.insertJourneyCoConstructionUnitPartyStatistics,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function modifyJourneyCoConstructionUnitPartyStatistics (params) {
  return request({
    url: urls.modifyJourneyCoConstructionUnitPartyStatistics,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function findRankingJourneyCommunityOwnerList (params) {
  return request({
    url: urls.findRankingJourneyCommunityOwnerList,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function batchUpdateJourneyCommunityOwnerRanking (params) {
  return request({
    url: urls.batchUpdateJourneyCommunityOwnerRanking,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function getCommunityNotePage (params) {
  return request({
    url: urls.getCommunityNotePage,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function createJourneyResourceSharing (params) {
  return request({
    url: urls.createJourneyResourceSharing,
    method: 'post',
    data: {
      communityOrgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function communitygetCommunityNoteCommentPage (params) {
  return request({
    url: urls.communitygetCommunityNoteCommentPage,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function insertJourneyCommunityPartyGraphic (params) {
  return request({
    url: urls.insertJourneyCommunityPartyGraphic,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function updateJourneyCommunityPartyGraphic (params) {
  return request({
    url: urls.updateJourneyCommunityPartyGraphic,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function updateOrgServiceHotline (params) {
  return request({
    url: urls.updateOrgServiceHotline,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function findRankingJourneyCommunityStewardList (params) {
  return request({
    url: urls.findRankingJourneyCommunityStewardList,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function batchUpdateJourneyCommunityStewardRanking (params) {
  return request({
    url: urls.batchUpdateJourneyCommunityStewardRanking,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function findRankingJourneyCommunityBuildingList (params) {
  return request({
    url: urls.findRankingJourneyCommunityBuildingList,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function batchUpdateJourneyCommunityBuildingRanking (params) {
  return request({
    url: urls.batchUpdateJourneyCommunityBuildingRanking,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function updateJourneyCommunitySteward (params) {
  return request({
    url: urls.updateJourneyCommunitySteward,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function findJourneyCommunityStewardList (params) {
  return request({
    url: urls.findJourneyCommunityStewardList,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function updateJourneyCommunityBuilding (params) {
  return request({
    url: urls.updateJourneyCommunityBuilding,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function findJourneyCommunityBuildingList (params) {
  return request({
    url: urls.findJourneyCommunityBuildingList,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function findJourneyCommunityPropertyList (params) {
  return request({
    url: urls.findJourneyCommunityPropertyList,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function updateJourneyCommunityProperty (params) {
  return request({
    url: urls.updateJourneyCommunityProperty,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function updateJourneyCommunityOwner (params) {
  return request({
    url: urls.updateJourneyCommunityOwner,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function findJourneyCommunityOwnerList (params) {
  return request({
    url: urls.findJourneyCommunityOwnerList,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function updateJourneyCommunityAlliance (params) {
  return request({
    url: urls.updateJourneyCommunityAlliance,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function insertJourneyCommunityAlliance (params) {
  return request({
    url: urls.insertJourneyCommunityAlliance,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function findJourneyCommunityAllianceList (params) {
  return request({
    url: urls.findJourneyCommunityAllianceList,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function updateJourneyCommunityParty (params) {
  return request({
    url: urls.updateJourneyCommunityParty,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function findJourneyCommunityPartyList (params) {
  return request({
    url: urls.findJourneyCommunityPartyList,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function insertJourneyCommunityParty (params) {
  return request({
    url: urls.insertJourneyCommunityParty,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function findRankingJourneyCommunityPartyList (params) {
  return request({
    url: urls.findRankingJourneyCommunityPartyList,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function batchUpdateJourneyCommunityPartyRanking (params) {
  return request({
    url: urls.batchUpdateJourneyCommunityPartyRanking,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function checkJourneyAdvertisementByTime (params) {
  return request({
    url: urls.checkJourneyAdvertisementByTime,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function findJourneyAdvertisementById (params) {
  return request({
    url: urls.findJourneyAdvertisementById,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function findJourneyCommunityPage (params) {
  return request({
    url: urls.findJourneyCommunityPage,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function findJourneyCommunityProblemPage (params) {
  return request({
    url: urls.findJourneyCommunityProblemPage,
    method: 'post',
    data: {
      communityOrgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function modifyJourneyCommunityProblemStatus (params) {
  return request({
    url: urls.modifyJourneyCommunityProblemStatus,
    method: 'post',
    data: {
      communityOrgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function findJourneyCommunityProblemById (params) {
  return request({
    url: urls.findJourneyCommunityProblemById,
    method: 'post',
    data: {
      communityOrgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function deleteJourneyCommunityProblem (params) {
  return request({
    url: urls.deleteJourneyCommunityProblem,
    method: 'post',
    data: {
      communityOrgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function getJourneyCommunityMessagePage (params) {
  return request({
    url: urls.getJourneyCommunityMessagePage,
    method: 'post',
    data: {
      communityOrgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function removeJourneyCommunityMessage (params) {
  return request({
    url: urls.removeJourneyCommunityMessage,
    method: 'post',
    data: {
      communityOrgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function replyJourneyCommunityMessage (params) {
  return request({
    url: urls.replyJourneyCommunityMessage,
    method: 'post',
    data: {
      communityOrgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function modifyJourneyCommunityWish (params) {
  return request({
    url: urls.modifyJourneyCommunityWish,
    method: 'post',
    data: {
      communityOrgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function getJourneyCommunityWishPage (params) {
  return request({
    url: urls.getJourneyCommunityWishPage,
    method: 'post',
    data: {
      communityOrgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function getJourneyCommunityWish (params) {
  return request({
    url: urls.getJourneyCommunityWish,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function deleteJourneyCommunityWish (params) {
  return request({
    url: urls.deleteJourneyCommunityWish,
    method: 'post',
    data: {
      ...params
    }
  })
}

export function createJourneyCommunityWish (params) {
  return request({
    url: urls.createJourneyCommunityWish,
    method: 'post',
    data: {
      communityOrgId: getGlobalParams('orgId'),
      ...params
    }
  })
}

export function findJourneyCommunityList (params) {
  return request({
    url: urls.findJourneyCommunityList,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function findJourneyAdvertisementsByPage (params) {
  return request({
    url: urls.findJourneyAdvertisementsByPage,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function deleteJourneyAdvertisement (params) {
  return request({
    url: urls.deleteJourneyAdvertisement,
    method: 'post',
    data: {
      ...params
    }
  })
}
export function insertJourneyAdvertisement (params) {
  return request({
    url: urls.insertJourneyAdvertisement,
    method: 'post',
    data: {
      orgId: getGlobalParams('orgId'),
      ...params
    }
  })
}
export function updateJourneyAdvertisement (params) {
  return request({
    url: urls.updateJourneyAdvertisement,
    method: 'post',
    data: {
      ...params
    }
  })
}
