import test = require('tape')
import createResolveFromNpm from '@pnpm/npm-resolver'
import tempy = require('tempy')

const resolveFromNpm = createResolveFromNpm({})

test('resolveFromNpm()', async t => {
  const resolveResult = await resolveFromNpm({alias: 'is-positive', pref: '1.0.0'}, {
    storePath: tempy.directory(),
    registry: 'https://registry.npmjs.org/',
    offline: false,
  })
  t.equal(resolveResult!.id, 'registry.npmjs.org/is-positive/1.0.0')
  t.equal(resolveResult!.latest!.split('.').length, 3)
  t.deepEqual(resolveResult!.resolution, {
    integrity: 'sha1-iACYVrZKLx632LsBeUGEJK4EUss=',
    registry: 'https://registry.npmjs.org/',
    tarball: 'https://registry.npmjs.org/is-positive/-/is-positive-1.0.0.tgz',
  })
  t.ok(resolveResult!.package)
  t.ok(resolveResult!.package!.name, 'is-positive')
  t.ok(resolveResult!.package!.version, '1.0.0')
  t.end()
})
