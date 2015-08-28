"use strict";

Checks
  .register(
    "index.settings",
    [
      {
        name : "In-memory indices",
        color : "red",
        check : function(settings) {
          if (Checks.get_key(settings, "index.store.type").match(/ram|memory/)) {
            return "Indices with `index.store.type` of `ram` or `memory` "
              + "are no longer supported."
          }
        }
      },

      {
        name : "Type wrapper setting",
        color : "red",
        check : function(settings) {
          if (Checks.get_key(settings, "index.mapping.allow_type_wrapper") === 'true') {
            return "The document `_source` field may no longer have "
              + "the type name as the root element. "
              + "Remove the `index.mapping.allow_type_wrapper` setting.";
          }
        }
      },

      {
        name : "Codec setting",
        color : "red",
        check : function(settings) {
          if (Checks.get_key(settings, "index.codec")) {
            return "Custom codecs can no longer be configured. Reindex "
              + "without the `index.codec` setting.";
          }
        }
      },

      {
        name : "Default index analyzer",
        color : "yellow",
        check : function(settings) {
          if (Checks.get_key(settings, "index.analysis.analyzer.default_index")) {
            return "`default_index` analyzer has been replaced by the name `default`."
          }
        }
      },

      {
        name : "Units for time and byte settings",
        color : "blue",
        check : function(settings) {

          var list = [ "index.buffer_size", "index.merge.policy.floor_segment",
            "index.merge.policy.max_merged_segment",
            "index.merge.policy.max_merge_size",
            "index.merge.policy.min_merge_size",
            "index.shard.recovery.file_chunk_size",
            "index.shard.recovery.translog_size",
            "index.store.throttle.max_bytes_per_sec",
            "index.translog.flush_threshold_size",
            "index.translog.fs.buffer_size", "index.version_map_size",
            "index.gateway.wait_for_mapping_update_post_recovery",
            "index.gc_deletes", "index.indexing.slowlog.threshold.index.debug",
            "index.indexing.slowlog.threshold.index.info",
            "index.indexing.slowlog.threshold.index.trace",
            "index.indexing.slowlog.threshold.index.warn",
            "index.refresh_interval",
            "index.search.slowlog.threshold.fetch.debug",
            "index.search.slowlog.threshold.fetch.info",
            "index.search.slowlog.threshold.fetch.trace",
            "index.search.slowlog.threshold.fetch.warn",
            "index.search.slowlog.threshold.query.debug",
            "index.search.slowlog.threshold.query.info",
            "index.search.slowlog.threshold.query.trace",
            "index.search.slowlog.threshold.query.warn",
            "index.shadow.wait_for_initial_commit",
            "index.store.stats_refresh_interval",
            "index.translog.flush_threshold_period", "index.translog.interval",
            "index.translog.sync_interval" ];
          var errors = [];
          forall(list, function(setting) {
            if (Checks.get_key(settings, setting).match(/\d$/)) {
              errors.push(setting)
            }
          });
          if (errors.length) {
            return "Units are required for byte and time settings: "
              + errors.sort().join(", ");
          }
        }
      },

      {
        name : "Merge policy settings",
        color : "blue",
        check : function(settings) {

          var list = [ "index.merge.policy.type",
            "index.merge.policy.min_merge_size",
            "index.merge.policy.max_merge_size",
            "index.merge.policy.merge_factor",
            "index.merge.policy.max_merge_docs",
            "index.merge.policy.calibrate_size_by_deletes",
            "index.merge.policy.min_merge_docs",
            "index.merge.policy.max_merge_docs", ];
          var errors = [];
          forall(list, function(setting) {
            if (Checks.get_key(settings, setting)) {
              errors.push(setting)
            }
          });
          if (errors.length) {
            return "Merge policy settings will be ignored: "
              + errors.sort().join(", ");
          }
        }
      },

    ]);
