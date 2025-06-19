import React, { useState } from "react";

const SystemSettings = () => {
  const [smsProvider, setSmsProvider] = useState("Twilio");
  const [smsApiKey, setSmsApiKey] = useState("");
  const [backupPolicy, setBackupPolicy] = useState("daily");
  const [backupLocation, setBackupLocation] = useState("");

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">System Settings</h2>
      <form className="space-y-8">
        {/* SMS Provider Settings */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">SMS Provider</h3>
          <div className="flex flex-col gap-3">
            <select
              className="input"
              value={smsProvider}
              onChange={e => setSmsProvider(e.target.value)}
            >
              <option value="Twilio">Twilio</option>
              <option value="Nexmo">Nexmo</option>
              <option value="Infobip">Infobip</option>
            </select>
            <input
              className="input"
              type="text"
              placeholder="API Key / Auth Token"
              value={smsApiKey}
              onChange={e => setSmsApiKey(e.target.value)}
            />
          </div>
        </div>
        {/* Backup Policy Settings */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Backup Policy</h3>
          <div className="flex flex-col gap-3">
            <select
              className="input"
              value={backupPolicy}
              onChange={e => setBackupPolicy(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <input
              className="input"
              type="text"
              placeholder="Backup Location (e.g., S3 bucket, local path)"
              value={backupLocation}
              onChange={e => setBackupLocation(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">Save Settings</button>
        </div>
      </form>
    </div>
  );
};

export default SystemSettings;
