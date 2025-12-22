import featuresConfig from '@/config/features.json'

export type FeatureKey =
  | 'unlimited_categories'
  | 'unlimited_goals'
  | 'unlimited_wallets'
  | 'unlimited_csv_imports'
  | 'cloud_sync'
  | 'cloud_backup'
  | 'notion_import'
  | 'advanced_reports'
  | 'pdf_export'
  | 'excel_export'
  | 'smart_rules'
  | 'ai_insights'
  | 'premium_widgets'

export type FeatureConfig = {
  enabled: boolean
}

export type FeatureFlags = {
  features: Record<string, FeatureConfig>
}

const featureFlags: FeatureFlags = featuresConfig as FeatureFlags

export function getFeatureFlags(): FeatureFlags {
  return featureFlags
}

export function isFeatureEnabled(key: FeatureKey): boolean {
  const flags = getFeatureFlags()
  const feature = flags.features[key]
  return !!(feature && feature.enabled)
}






