
import { JobAudit } from "@prisma/client";
import JobAuditEntry from "./jobAuditEntry";

interface JobAuditProps {
  jobAudits: JobAudit[] | undefined;
  userMap: Record<string, string>;
}

export default function JobAuditLog({ jobAudits, userMap }: JobAuditProps) {

  if (!jobAudits) {
    return <div>Loading...</div>
  }

  return (
    <div className="mt-10">
      <h2  className="m-2 text-lg">Audit Log</h2>
      <ul>
        {jobAudits.map((audit, index) => {
          return <JobAuditEntry key={index} audit={audit} userMap={userMap} />
        })}
      </ul>
    </div>
  );
}
