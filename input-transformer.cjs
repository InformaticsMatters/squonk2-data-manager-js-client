const translations = {
  'app.api_application.get': 'getApplications',
  'app.api_application.get_application': 'getApplication',
  'app.api_dataset.get': 'getDatasets',
  'app.api_dataset.put': 'createDatasetFromFile',
  'app.api_dataset.post': 'uploadDataset',
  'app.api_dataset.delete': 'deleteDataset',
  'app.api_dataset.get_dataset': 'downloadDataset',
  'app.api_dataset.delete_editor': 'removeEditorFromDataset',
  'app.api_dataset.put_editor': 'addEditorToDataset',
  'app.api_dataset.get_versions': 'getVersions',
  'app.api_file.post': 'attachFile',
  'app.api_file.delete': 'deleteFile',
  'app.api_file.get': 'getFiles',
  'app.api_file.get_file': 'downloadFile',
  'app.api_dataset.get_digest': 'getDatasetDigest',
  'app.api_instance.get': 'getInstances',
  'app.api_instance.post': 'createInstance',
  'app.api_instance.delete': 'terminateInstance',
  'app.api_instance.get_instance': 'getInstance',
  'app.api_job.get': 'getJobs',
  'app.api_job.get_job': 'getJob',
  'app.api_project.get': 'getProjects',
  'app.api_project.post': 'createProject',
  'app.api_project.delete': 'deleteProject',
  'app.api_project.get_project': 'getProject',
  'app.api_project.delete_editor': 'removeEditorFromProject',
  'app.api_project.put_editor': 'addEditorToProject',
  'app.api_task.get': 'getTasks',
  'app.api_task.get_task': 'getTask',
  'app.api_type.get': 'getFileTypes',
  'app.api_user.get': 'getUsers',
};

module.exports = (obj) => {
  console.log('Starting Input Transformer');

  // Transform the operation Ids from python/Flask routes to semantically named functions in userland
  // TODO: Replace the hard-coded values by putting these names as an extension field in the Open API spec
  const opIds = new Set();
  let counter = 0;
  for (const value of Object.values(obj.paths)) {
    for (const defn of Object.values(value)) {
      const { operationId } = defn;
      opIds.add(operationId);
      // console.log(operationId);
      if (translations[operationId]) {
        defn.operationId = translations[operationId];
      } else {
        console.warn(`${counter} Missing OperationId Rename: ${operationId}`);
      }
      counter++;
    }
  }

  const extraTranslations = difference(new Set(Object.keys(translations)), opIds);
  if ([...extraTranslations].length) {
    console.log('Extra Translations:');
    console.log(extraTranslations);
  }
  console.log('Finished Input Transformer');

  return obj;
};

// Set difference
function difference(setA, setB) {
  const _difference = new Set(setA);
  for (const elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}
