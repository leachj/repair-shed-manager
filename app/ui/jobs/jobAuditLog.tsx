
import { JobAudit } from "@prisma/client";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import JobAuditEntry from "./jobAuditEntry";

TimeAgo.addDefaultLocale(en)

const timeAgo = new TimeAgo('en-GB')

interface JobAuditProps {
  jobAudits: JobAudit[] | undefined;
  userMap: Record<string, string>;
}

export default function JobAuditLog({ jobAudits, userMap }: JobAuditProps) {

  if (!jobAudits) {
    return <div>Loading...</div>
  }

  const mapValue = (field: string|null, value: string|null) => {
    if(field === "status") {
     return (value || "").replaceAll("_"," ").toLowerCase()
    }
    if(field === "repairer") {
      return value? userMap[value] || value : "unassigned"
    }
    return value;
  }

  return (
    <div className="mt-10">
      <h2  className="m-2 text-lg">Audit Log</h2>
      <ul>
        {jobAudits.map((audit, index) => {
          return <JobAuditEntry audit={audit} index={index} userMap={userMap} />
        })}
      </ul>
    </div>
  );
}
