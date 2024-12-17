# Maintainer: Devin Bidwell <dbidwell94@biddydev.com>
pkgname='patchman-bin'
pkgver='0.1.0'
pkgrel=1
pkgdesc="An open source API tester built on Tauri and React"
arch=("x86_64")
url="https://github.com/dbidwell94/patchman"
license=('MIT')
provides=("patchman")

depends=("webkit2gtk-4.1" "openssl")
optdepends=()

changelog='CHANGELOG.md'

source=("https://github.com/dbidwell94/patchman/releases/latest/download/patchman_${pkgver}_amd64.deb")

sha256sums=('SKIP')

package() {
	bsdtar -xf "$srcdir/data.tar.gz" -C "$pkgdir"
}
