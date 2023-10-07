import { EnrichmentPlugin, PageTrackingOptions as Options } from '@amplitude/analytics-types';
export { PageTrackingOptions as Options, PageTrackingTrackOn, PageTrackingHistoryChanges, } from '@amplitude/analytics-types';
export interface CreatePageViewTrackingPlugin {
    (options?: Options): EnrichmentPlugin;
}
//# sourceMappingURL=page-view-tracking.d.ts.map